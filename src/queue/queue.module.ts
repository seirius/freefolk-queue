import { Module } from "@nestjs/common";
import { QueueService } from "./queue.service";
import { QueueController } from "./queue.controller";
import { RedisModule } from "./../redis/redis.module";

@Module({
    imports: [RedisModule],
    providers: [QueueService],
    controllers: [QueueController]
})
export class QueueModule {}