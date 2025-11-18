import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class RedisHelper {
  constructor(private readonly redisService: RedisService) {}

  async getKey(
    key: string,
    username: string,
    parent_key: string,
  ): Promise<string> {
    const redisData = await this.redisService.get(
      `tiktok_${username}_channelSession`,
    )

    if (!redisData) {
      throw new Error('Redis data not found');
    }

    try {
      const parsedData = JSON.parse(redisData);
      const parentKeyData = parsedData[parent_key];
      let keyValue;
      if (parent_key === 'config') {
        keyValue = parentKeyData.find((i) => i.key === key)?.value;
        if (!keyValue) {
          throw new Error(`Key "${key}" not found in Redis`);
        }
      } else {
        keyValue = parentKeyData[key];
        if (!keyValue) {
          throw new Error(`Key "${key}" not found in Redis`);
        }
      }

      return keyValue;
    } catch (error) {
      console.error('Error parsing Redis data:', error.message);
      throw new Error('Failed to retrieve or parse Redis data');
    }
  }

    async getTiktokKey(): Promise<any[]> {
    const data:any = await this.redisService.getTiktokData();

    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid data format returned from Redis');
    }

    return data.map((item) => {
      try {
        return {
          key: item.key,
          value: JSON.parse(item.value), // Parse the JSON string
        };
      } catch (error) {
        console.error(
          `Error parsing value for key "${item.key}":`,
          error.message,
        );
        throw new Error('Failed to parse Redis data');
      }
    });
  }
}