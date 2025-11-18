import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_CONFIG_HOST,
      port: process.env.REDIS_CONFIG_PORT,
    } as any);

    this.redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }

  onModuleInit() {
    console.log('RedisService initialized');
  }

  /**
   * Set a value in Redis with an optional expiration time (in seconds).
   * @param key - The Redis key.
   * @param value - The value to store.
   * @param ttl - (Optional) Time to live in seconds.
   */
  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await this.redisClient.set(key, value, 'EX', ttl);
      } else {
        await this.redisClient.set(key, value);
      }
    } catch (error) {
      console.error(`Error setting key "${key}":`, error);
      throw error;
    }
  }

  /**
   * Get a value from Redis by key.
   * @param key - The Redis key.
   * @returns The value stored in Redis or null if not found.
   */
  async get(key: string): Promise<string | null> {
    try {
      const value = await this.redisClient.get(key);
      return value;
    } catch (error) {
      console.error(`Error getting key "${key}":`, error);
      throw error;
    }
  }

  /**
   * Delete a key from Redis.
   * @param key - The Redis key to delete.
   * @returns The number of keys that were removed.
   */
  async delete(key: string): Promise<number> {
    try {
      const result = await this.redisClient.del(key);
      return result;
    } catch (error) {
      console.error(`Error deleting key "${key}":`, error);
      throw error;
    }
  }

  async getTiktokData() {
    let cursor = '0';
    let data: any[] = [];
  
    do {
      const [newCursor, keys] = await this.redisClient.scan(cursor, 'MATCH', 'tiktok_*');
      cursor = newCursor;
      for (const key of keys) {
        const value = await this.redisClient.get(key);
        data.push({ key, value });
      }
    } while (cursor !== '0');
    return data
  // Output: Array of keys and values
  }
}
