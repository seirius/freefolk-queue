import { Injectable } from "@nestjs/common";
import { RedisClient, createClient } from "redis";
import { RedisConfig } from "./../config/RedisConfig";

@Injectable()
export class RedisService {

    public queueClient: RedisClient;

    constructor() {
        this.queueClient = createClient({
            host: RedisConfig.HOST,
            port: RedisConfig.PORT,
            db: RedisConfig.QUEUE_DB
        });
    }

}