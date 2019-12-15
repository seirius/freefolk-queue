import { Injectable } from "@nestjs/common";
import { RedisService } from "./../redis/redis.service";
import { RedisConfig } from "./../config/RedisConfig";

@Injectable()
export class QueueService {

    constructor(
        private readonly redisService: RedisService
    ) {}

    public push({name, payload}: IPushArgs): Promise<void> {
        return new Promise((resolve) => {
            this.redisService.queueClient
            .rpush(`${RedisConfig.QUEUE_KEY}:${name}`, JSON.stringify(payload), () => resolve());
        });
    }

    public async npush({name, payload}: INPushArgs): Promise<void> {
        const promises = payload.map((payl) => this.push({name, payload: payl}));
        await Promise.all(promises);
    }

    public pop(name: string): Promise<Record<string, any>> {
        return new Promise((resolve, reject) => {
            this.redisService.queueClient
            .lpop(`${RedisConfig.QUEUE_KEY}:${name}`, (error, reply) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(reply ? JSON.parse(reply) : undefined);
                }
            });
        });
    }

    public npop(name: string, number: number): Promise<Record<string, any>[]> {
        return new Promise(async (resolve, reject) => {
            const payloads = [];
            try {
                for (let i = 0; i < number; i++) {
                    const payload = await this.pop(name);
                    if (!payload) {
                        i = number;
                    } else {
                        payloads.push(payload);
                    }
                }
            } catch (error) {
                reject(error);
            }
            resolve(payloads);
        });
    }

}

export interface IPushArgs {
    name: string;
    payload: Record<string, any>;
}

export interface INPushArgs {
    name: string;
    payload: Record<string, any>[];
}