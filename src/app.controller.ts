import { Body, Controller, Get, Logger, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { WebhookCommentResponseDto } from './dto/webhook-comment-response.dto';
import { ResponseHelper } from './helpers/response.helper';
import { CommonResponseDto } from './dto/common-response.dto';
import { messagePayloadI } from './dto/docspec.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name, { timestamp: true });

  constructor(
    private readonly appService: AppService,
    private readonly responseHelper: ResponseHelper,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('webhook-comment')
  async getWebhookComment(@Body() body: WebhookCommentResponseDto, @Res() res: Response): Promise<CommonResponseDto> {
    try {
      this.logger.log('webhook hit');
      const data = await this.appService.saveData(body);
      this.logger.log(data);
      return this.responseHelper.responseSuccess(res, 200, 'Success');
    } catch (error) {
      this.logger.error(error);
      return this.responseHelper.responseServerError(res, error);
    }
  }

  @Post('reply-comment')
  async replyComment(@Body() body: messagePayloadI, @Res() res: Response): Promise<CommonResponseDto> {
    try {
      this.logger.log('reply comment hit');
      const data = await this.appService.replyComment(body);
      this.logger.log(data);
      return this.responseHelper.responseSuccessData(res, 200, 'Success', data);
    } catch (error) {
      this.logger.error(error);
      return this.responseHelper.responseServerError(res, error);
    }
  }

  @Get('health')
  async healthCheck(@Res() res: Response): Promise<CommonResponseDto> {
    try {
      this.logger.log('health check hit');
      console.log(JSON.stringify(JSON.stringify({
        channel: {
          id: 567,
          orgId: 12,
          channel_list_id: 2,
          username: "-000WaFzrJHybQN_lb08GE6vi3DizWFijk1F",
          name: "raisecallphincon",
          channel: "tiktok",
          type: "session",
          notes: "Social Media",
          isActive: true,
          alias: "demotiktok",
          redis_key: "tiktok_-000WaFzrJHybQN_lb08GE6vi3DizWFijk1F_channelSession",
          uuid: "",
          avatar: "",
          isloggedin: true,
          deleted: null,
          ostConfig: {
            id: 13200,
            orgId: 12,
            namespace: "tiktok",
            key: "subchannel",
            value: "[comments]",
            description: "",
            isedit: 0,
            object_id: null
          }
        },
        config: [
          {
            id: 8265,
            channel_id: 567,
            key: "session_success_timeout",
            value: "10"
          },
          {
            id: 8266,
            channel_id: 567,
            key: "short_abandon_timeout",
            value: "10"
          },
          {
            id: 8267,
            channel_id: 567,
            key: "auto_end_interaction",
            value: "false"
          },
          {
            id: 8268,
            channel_id: 567,
            key: "subchannel",
            value: "[comments]"
          },
          {
            id: 8269,
            channel_id: 567,
            key: "APP_ID",
            value: "7421850573206454288"
          },
          {
            id: 8270,
            channel_id: 567,
            key: "APP_SECRET",
            value: "3c5c5c51f5476d4c06eb1410bb3d689846b42ad4"
          },
          {
            id: 8271,
            channel_id: 567,
            key: "AUTH_CODE",
            value: "MTnAPqbfUKsdSqRMKrE9NW0v9TemzIGQu6bXa9r3Ur5QLOYYsCLSnQgSrsFXfAn4CYkmeq8HGRyPlBZOHj4hBqmV4p6DQ7ki93M6uHBag73rJKyJmlNXkn8XwE-hRAE4sIHXoQScXt-9W7vroSQdmK2M-49W0gEM1yajJQEm9JUm62KuTRzK1RvzSpImwrXD0YtFj_S5sxHS6SXl9zBYl7nkCn8kOJaCzRFkikeAYvnoQddEIbK-ls7a42E8y1QFgroCihxD_qA9M4dUUZeytw%2A2%215155.s1"
          },
          {
            id: 8272,
            channel_id: 567,
            key: "INTERACTION_URL",
            value: "https://appdev.raisecall.com/api/v1"
          },
          {
            id: 8273,
            channel_id: 567,
            key: "REDIRECT_URI",
            value: "https://appdev.raisecall.com/"
          },
          {
            id: 8274,
            channel_id: 567,
            key: "ACCESS_TOKEN",
            value: "act.dPuXNZUBHYc18xWFyt0rRmW5UTHRv5kZjNdFQAFRydsTgkybmiIU7TQMJncq!5208.s1"
          },
          {
            id: 8274,
            channel_id: 567,
            key: "REFRESH_TOKEN",
            value: "rft.MQcZXQLo0RgsDzbRG0jLSnKKeaM8l4dJ3xjUrhfFuEOhcyaxKngz3oDSFng3!5168.s1"
          },
          {
            id: 8274,
            channel_id: 567,
            key: "BUSINESS_ID",
            value: "-000WaFzrJHybQN_lb08GE6vi3DizWFijk1F"
          },
          {
            id: 8275,
            channel_id: 567,
            key: "key",
            value: "id"
          },
          {
            id: 8277,
            channel_id: 567,
            key: "BASE_URL_TIKTOK",
            value: "https://business-api.tiktok.com/open_api"
          },
          {
            id: 8278,
            channel_id: 567,
            key: "idle_notification_alert",
            value: "[]"
          },
          {
            id: 13200,
            orgId: 12,
            namespace: "tiktok",
            key: "subchannel",
            value: "[comments, chat]",
            description: "",
            isedit: 0,
            object_id: null
          }
        ]
      })))
      return this.responseHelper.responseSuccess(res, 200, 'Success');
    } catch (error) {
      this.logger.error(error);
      return this.responseHelper.responseServerError(res, error);
    }
  }
}
