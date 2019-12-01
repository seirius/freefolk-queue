import { createClient, RedisClient } from "redis";
import { RedisConfig } from "../config/RedisConfig";

export class RedisClientFF {

    public static QUEUE_CLIENT: RedisClient;

    public static init(): void {
        RedisClientFF.QUEUE_CLIENT = createClient({
            host: RedisConfig.HOST,
            port: RedisConfig.PORT,
            db: RedisConfig.QUEUE_DB
        });
    }

}