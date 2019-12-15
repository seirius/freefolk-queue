import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, HttpException, ParseIntPipe } from "@nestjs/common";
import { PushDto, PushResponseDto, NPushDto } from "./queue.dto";
import { QueueService } from "./queue.service";
import { ApiOkResponse, ApiNotFoundResponse } from "@nestjs/swagger";

@Controller()
export class QueueController {

    constructor(
        private readonly queueService: QueueService
    ) {}

    @Post("push")
    @ApiOkResponse({
        description: "Push to queue",
        type: PushResponseDto
    })
    @HttpCode(HttpStatus.OK)
    public async push(@Body() payload: PushDto): Promise<PushResponseDto> {
        await this.queueService.push(payload);
        return {ok: true};
    }

    @Post("npush")
    @ApiOkResponse({
        description: "Multiple push to queue",
        type: PushResponseDto
    })
    @HttpCode(HttpStatus.OK)
    public async npush(@Body() payload: NPushDto): Promise<PushResponseDto> {
        await this.queueService.npush(payload);
        return {ok: true};
    }

    @Get("pop/:name")
    @ApiOkResponse({
        description: "Pop from queue by name",
        type: Object
    })
    @ApiNotFoundResponse({
        description: "No item was found by name"
    })
    public async pop(@Param("name") name: string): Promise<Record<string, any>> {
        const payload = await this.queueService.pop(name);
        if (!payload) {
            throw new HttpException("No item was found", HttpStatus.NOT_FOUND);
        }
        return payload;
    }

    @Get("pop/:name/:number")
    @ApiOkResponse({
        description: "Pop multiple items from queue by name",
        type: [Object]
    })
    @ApiNotFoundResponse({
        description: "Not item was found by name"
    })
    public async npop(
        @Param("name") name: string,
        @Param("number", ParseIntPipe) number: number
    ) {
        const payload = await this.queueService.npop(name, number);
        if (!payload || !payload.length) {
            throw new HttpException("No items were found", HttpStatus.NOT_FOUND);
        }
        return {payload};
    }

}