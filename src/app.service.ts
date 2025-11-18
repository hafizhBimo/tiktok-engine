import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { WebhookCommentResponseDto } from './dto/webhook-comment-response.dto';
import { ResponseHelper } from './helpers/response.helper';
import { TiktokEventHandlerService } from './services/tiktok-event-handler.service';
import { messagePayloadI } from './dto/docspec.dto';
import { RedisService } from './services/redis.service';
import { RedisHelper } from './helpers/redis.helper';
import { RedisDataResponseDto } from './dto/redis-data-response.dto';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name, { timestamp: true });

  constructor(
    private readonly tiktokeventHandlerService: TiktokEventHandlerService,
    private readonly redisHelper: RedisHelper
  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  async getRedisData(businessId:string):Promise<RedisDataResponseDto>{
    const orgId = await this.redisHelper.getKey('orgId', businessId, 'channel');
    const channelName = await this.redisHelper.getKey('name', businessId, 'channel');
    const accessToken = await this.redisHelper.getKey('ACCESS_TOKEN', businessId, 'config');
    const refreshToken = await this.redisHelper.getKey('REFRESH_TOKEN', businessId, 'config');
    const appId = await this.redisHelper.getKey('APP_ID', businessId, 'config');
    const appSecret = await this.redisHelper.getKey('APP_SECRET', businessId, 'config');
    const baseUrl = await this.redisHelper.getKey('BASE_URL_TIKTOK', businessId, 'config');
    const interactionUrl = await this.redisHelper.getKey('INTERACTION_URL', businessId, 'config');
    const baseUrlTiktok = await this.redisHelper.getKey('BASE_URL_TIKTOK', businessId, 'config');
    return {
      orgId,
      channelName,
      accessToken,
      refreshToken,
      appId,
      appSecret,
      baseUrl,
      interactionUrl,
      baseUrlTiktok,
      businessId
    }
  }

  async saveData(body: WebhookCommentResponseDto):Promise<any>{
        //handle comment inbound
        const redisData: RedisDataResponseDto = await this.getRedisData(body.user_openid);
        if (body.event === 'comment.update') {
          return this.tiktokeventHandlerService.handleComment(body, redisData);
        }
        //handle mention inbound
        if (body.event === 'brand.mention.event') {
          return this.tiktokeventHandlerService.handleMention(body, redisData);
        }
  }

  async replyComment(body: messagePayloadI): Promise<any> {
    if (!body.to.id) {
      throw new Error('body.to.id is undefined');
    }
    const redisData: RedisDataResponseDto = await this.getRedisData(body.to.id);
    return this.tiktokeventHandlerService.handleReplyComment(body, redisData);
  }
}
