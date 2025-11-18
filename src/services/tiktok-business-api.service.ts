import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GetCommentByIdResponseDto } from 'src/dto/get-comment-by-id-response.dto';
import { getVideoResponseDto } from 'src/dto/get-video-response.dto';
import { RedisDataResponseDto } from 'src/dto/redis-data-response.dto';
import { ReplyCommentResponseDto } from 'src/dto/reply-comment-response.dto';

@Injectable()
export class TiktokBusinessApiService {
  constructor(private readonly httpService: HttpService) { }

  async getCommentByCommentId(commentId: string, videoId: string, redisData: RedisDataResponseDto): Promise<GetCommentByIdResponseDto> {

    const accessToken = redisData.accessToken
    const businessId = redisData.businessId;
    const baseUrlTiktok = redisData.baseUrlTiktok;

    const response = await firstValueFrom(
      this.httpService.get(`${baseUrlTiktok}/v1.3/business/comment/list/?business_id=${businessId}&video_id=${videoId}&comment_ids=["${commentId}"]`, {
        headers: {
          'Access-Token': accessToken
        }
      })
    );
    return response.data;
  }

  async getMentionInComment(commentId: string, videoId: string): Promise<any> {
    const accessToken = 'act.KTb6ESKHMT0ebC8GmlFKYfQLwpwgPv85UfwBvx2Z0U5Or57022GkAPxW0cVh!5159.s1'
    const businessId = process.env.BUSINESS_ID;

    const response = await firstValueFrom(
      this.httpService.get(`https://business-api.tiktok.com/open_api/v1.3/business/mention/comment/get/?business_id=${businessId}&comment_id=${commentId}&item_id=${videoId}&fields=["item_id","video_link","caption","video_likes","thumbnail_url","commenter_handle_name","comment_id","comment_type","comment_text","comment_create_time","comment_likes"]`, {
        headers: {
          'Access-Token': accessToken
        }
      })
    );
    return response.data;
  }

  async getVideoData(videoId: string, redisData: RedisDataResponseDto): Promise<getVideoResponseDto> {
    const accessToken = redisData.accessToken
    const businessId = redisData.businessId;
    const baseUrlTiktok = redisData.baseUrlTiktok;

    const response = await firstValueFrom(
      this.httpService.get(`${baseUrlTiktok}/v1.3/business/video/list/?business_id=${businessId}&fields=["item_id","create_time","thumbnail_url","share_url","embed_url","caption","video_views","likes","comments","shares","reach","video_duration","full_video_watched_rate","total_time_watched","average_time_watched","impression_sources","audience_countries"]&video_ids=["${videoId}"]`, {
        headers: {
          'Access-Token': accessToken
        }
      })
    );
    return response.data;
  }

  async replyComment(commentId: string, videoId: string, text: string, redisData: RedisDataResponseDto): Promise<ReplyCommentResponseDto> {
    const accessToken = redisData.accessToken
    const businessId = redisData.businessId;
    const baseUrlTiktok = redisData.baseUrlTiktok;
    const response = await firstValueFrom(
      this.httpService.post(`${baseUrlTiktok}/open_api/v1.3/business/comment/reply/create/`,
        {
          business_id: businessId,
          comment_id: commentId,
          video_id: videoId,
          text: text
        },
        {
          headers: {
            'Access-Token': accessToken
          },
        }
      )
    );
    return response.data;
  }

  async getAccessToken(): Promise<any>{
    const clientKey = process.env.CLIENT_KEY;
    const clientSecret = process.env.CLIENT_SECRET;
    const grantType = 'authorization_code';
    const authCode = process.env.AUTH_CODE;
    const redirectUri = process.env.REDIRECT_URI;
    const response = await firstValueFrom(
      this.httpService.post(`https://business-api.tiktok.com/open_api/v1.3/business/auth/token/`, {
        client_key: clientKey,
        client_secret: clientSecret,
        grant_type: grantType,
        code: authCode,
        redirect_uri: redirectUri
      })
    );
    return response.data;
  }

  async refreshAccessToken(): Promise<any>{
    const clientKey = process.env.CLIENT_KEY;
    const clientSecret = process.env.CLIENT_SECRET;
    const grantType = 'refresh_token';
    const refreshToken = process.env.REFRESH_TOKEN;
    const response = await firstValueFrom(
      this.httpService.post(`https://business-api.tiktok.com/open_api/v1.3/business/auth/refresh_token/`, {
        client_key: clientKey,
        client_secret: clientSecret,
        grant_type: grantType,
        refresh_token: refreshToken
      })
    );
    return response.data;
  }


}
