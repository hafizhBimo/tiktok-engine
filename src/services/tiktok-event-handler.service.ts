import { WebhookCommentResponseDto } from "src/dto/webhook-comment-response.dto";
import { TiktokBusinessApiService } from "./tiktok-business-api.service";
import { commentContentResponseDto } from "src/dto/comment-content-response.dto";
import { Injectable, Logger } from "@nestjs/common";
import { GetCommentByIdResponseDto } from "src/dto/get-comment-by-id-response.dto";
import { mentionContentResponseDto } from "src/dto/mention-content-response.dto";
import { getMentionInCommentResponseDto } from "src/dto/get-mention-in-comment-response.dto";
import { getVideoResponseDto } from "src/dto/get-video-response.dto";
import { DocspecTransformerHelper } from "src/helpers/docspec-transformer.helper";
import { messagePayloadI } from "src/dto/docspec.dto";
import { ReplyCommentResponseDto } from "src/dto/reply-comment-response.dto";
import { RedisDataResponseDto } from "src/dto/redis-data-response.dto";

@Injectable()
export class TiktokEventHandlerService {
    private readonly logger = new Logger(TiktokEventHandlerService.name, { timestamp: true });

    constructor(
        private readonly tiktokBusinessApiService: TiktokBusinessApiService,
        private readonly docspecTransformerHelper: DocspecTransformerHelper
    ) { }

    async handleComment(body: WebhookCommentResponseDto, redisData: RedisDataResponseDto): Promise<messagePayloadI | string> {
        this.logger.log('comment event received');

        // convert ids into number before parsed
        const fixedContent = body.content.replace(/("comment_id":\s?)(\d+)/, '$1"$2"')
            .replace(/("video_id":\s?)(\d+)/, '$1"$2"')
            .replace(/("parent_comment_id":\s?)(\d+)/, '$1"$2"');

        const parsedContent: commentContentResponseDto = JSON.parse(fixedContent);

        const commentId = parsedContent.comment_id;
        const videoId = parsedContent.video_id;

        if (parsedContent.comment_action === 'set_to_public') {
            const commentData: GetCommentByIdResponseDto = await this.tiktokBusinessApiService.getCommentByCommentId(commentId, videoId, redisData);
            const videoData: getVideoResponseDto = await this.tiktokBusinessApiService.getVideoData(videoId, redisData);
            const response = await this.docspecTransformerHelper.inboundToDocspec(commentData, videoData, redisData);
            return response
        } else {
            return 'no action taken for other action'
        }
    }

    async handleMention(body: WebhookCommentResponseDto, redisData: RedisDataResponseDto): Promise<getMentionInCommentResponseDto | string> {
        this.logger.log('mention event received');

        const parsedContent: mentionContentResponseDto = JSON.parse(body.content);

        const commentId = parsedContent.comment_id;
        const videoId = parsedContent.video_id;

        if (parsedContent.type_of_event === 'CREATE') {
            const response = await this.tiktokBusinessApiService.getMentionInComment(commentId, videoId);
            return response;
        } else {
            return 'no action taken for other action';
        }
    }

    async handleReplyComment(body: messagePayloadI, redisData: RedisDataResponseDto): Promise<any> {
        if (!body.context || !body.context['video_id']) {
            throw new Error('video_id is required in context to reply comment');
        }
        const videoId = body.context['video_id'];
        const commentId: any = body.id.split('/').pop();
        const commentData: ReplyCommentResponseDto = await this.tiktokBusinessApiService.replyComment(commentId, videoId, body.content.body.text, redisData);
        const response = await this.docspecTransformerHelper.docspecToOutbound(body, commentData);
        return response
    }
}