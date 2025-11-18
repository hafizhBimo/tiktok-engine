import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ResponseHelper } from './helpers/response.helper';
import { TiktokBusinessApiService } from './services/tiktok-business-api.service';
import { TiktokEventHandlerService } from './services/tiktok-event-handler.service';
import { DocspecTransformerHelper } from './helpers/docspec-transformer.helper';
import { RedisService } from './services/redis.service';
import { RedisHelper } from './helpers/redis.helper';

@Module({
  imports: [ HttpModule ,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    ResponseHelper, 
    DocspecTransformerHelper,
    RedisHelper,
    AppService, 
    TiktokBusinessApiService,
    TiktokEventHandlerService,
    RedisService
  ],
})
export class AppModule {}
