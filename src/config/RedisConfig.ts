import * as env from "env-var";
import { config as envConfig } from "dotenv";
envConfig();

export class RedisConfig {
    public static readonly HOST = env.get("REDIS_HOST", "localhost").asString();
    public static readonly PORT = env.get("REDIS_PORT", "6379").asPortNumber();
    public static readonly QUEUE_DB = env.get("REDIS_QUEUE_DB", "1").asIntPositive();
    public static readonly QUEUE_KEY = env.get("REDIS_QUEUE_KEY", "queues").asString();
}