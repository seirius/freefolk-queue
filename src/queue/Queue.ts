import { RedisClientFF } from "../redis/RedisClientFF";
import { RedisConfig } from "../config/RedisConfig";

export class Queue {

    public static async push({name, payload}: IPushArgs): Promise<void> {
        return new Promise((resolve) => {
            RedisClientFF.QUEUE_CLIENT
            .rpush(`${RedisConfig.QUEUE_KEY}:${name}`, JSON.stringify(payload), () => resolve());
        });
    }

    public static async npush({name, payload}: INPushArgs): Promise<void> {
        const promises = payload.map((payl) => Queue.push({name, payload: payl}));
        await Promise.all(promises);
    }

    public static async pop(name: string): Promise<Record<string, any>> {
        return new Promise((resolve, reject) => {
            RedisClientFF.QUEUE_CLIENT
            .lpop(`${RedisConfig.QUEUE_KEY}:${name}`, (error, reply) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(reply ? JSON.parse(reply) : undefined);
                }
            });
        });
    }

    public static async npop(name: string, number: number): Promise<Record<string, any>[]> {
        return new Promise(async (resolve, reject) => {
            const payloads = [];
            try {
                for (let i = 0; i < number; i++) {
                    const payload = await Queue.pop(name);
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