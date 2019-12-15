import { Module } from '@nestjs/common';
import { DefaultModule } from './default/default.module';
import { QueueModule } from './queue/queue.module';

@Module({
    imports: [DefaultModule, QueueModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
