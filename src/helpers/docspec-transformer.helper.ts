import { messagePayloadI } from "src/dto/docspec.dto";
import { GetCommentByIdResponseDto } from "src/dto/get-comment-by-id-response.dto";
import { getVideoResponseDto } from "src/dto/get-video-response.dto";
import { RedisDataResponseDto } from "src/dto/redis-data-response.dto";
import { ReplyCommentResponseDto } from "src/dto/reply-comment-response.dto";

export class DocspecTransformerHelper {

    async inboundToDocspec(commentData: GetCommentByIdResponseDto, videoData: getVideoResponseDto, redisData: RedisDataResponseDto): Promise<messagePayloadI> {

        const username = redisData.channelName;
        const businessId = redisData.businessId;

        const response: messagePayloadI = {
            key: 'id',
            id: `tiktok/${username}/${commentData.data.comments[0].comment_id}`,
            platform: 'tiktok',
            channel: `${businessId}`,
            timestamp: new Date().toISOString(),
            type: 'comment',
            content: {
                body: {
                    type: 'text',
                    text: commentData.data.comments[0].text,
                }
            },
            interaction_direction: 'INBOUND',
            from: {
                id: commentData.data.comments[0].user_id,
                username: commentData.data.comments[0].username,
                name: commentData.data.comments[0].display_name,
                avatar: commentData.data.comments[0].profile_image
            },
            to: {
                id: `${businessId}`,
                username,
            },
            context:{
                media_id: commentData.data.comments[0].video_id,
                media_url: videoData.data.videos[0].share_url,
                video_caption: videoData.data.videos[0].caption,
                caption: videoData.data.videos[0].caption,
                media_username: commentData.data.comments[0].username
            },
        }
        return response;
    }

    async docspecToOutbound(body: messagePayloadI, commentResponse: ReplyCommentResponseDto): Promise<messagePayloadI> {
        const response: messagePayloadI = {
            key: 'id',
            id: `tiktok/${body.to.username}/${commentResponse.data.comment_id}`,
            platform: 'tiktok',
            channel: `${body.channel}`,
            timestamp: new Date().toISOString(),
            type: 'comment',
            content: {
                body: {
                    type: 'text',
                    text: commentResponse.data.text,
                }
            },
            interaction_direction: 'OUTBOUND',
            from: {
                id: `${body.to.id}`,
                username: `${body.to.username}`,
            },
            to: {
                id: body.from.id,
                username: body.from.username,
                name: body.from.name,
                avatar: body.from.avatar
            },
        }
        return response;
    }
}