import { Trip } from "@prisma/client";
import { Redis } from "ioredis";

const DEFAULT_TTL = 60 * 60 * 24;

export class RedisService {
  private redisClient = new Redis(process.env.REDIS_URL ?? "", {
    maxRetriesPerRequest: null,
  });

  /**
   * Gets key-value pair data from redis.
   * @param {String} key redis key
   * @returns data
   */
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redisClient.get(key);
    if (data === null) return null;
    return JSON.parse(data);
  }

  /**
   * Saves a key value pair on redis.
   * @param {String} key string.
   * @param {any} data data to save.
   * @param expires time-to-live.
   * @returns data.
   */
  async set<T>(key: string, fetcher: () => T, expires: number): Promise<T> {
    const data = await fetcher();
    console.log("I'm from your database");
    await this.redisClient.set(
      key,
      JSON.stringify(data),
      "EX",
      expires ?? DEFAULT_TTL
    );

    return data;
  }

  /**
   * Deletes a key and its corresponding value from redis.
   * @param {String} key string.
   */
  async del(key: string): Promise<void> {
    this.redisClient.del(key);
  }

  /**
   * Fetch data from database using fetcher function.
   * Return value will be from cache if cache-hit,
   * or from database if cache-miss.
   *
   * After cache-miss data will be cached for a day.
   */
  async fetch<T>(
    key: string,
    fetcher: () => any,
    expires = DEFAULT_TTL
  ): Promise<T> {
    const existing = await this.get<T>(key);
    if (existing !== null) return existing;
    return this.set(key, fetcher, expires);
  }
}
