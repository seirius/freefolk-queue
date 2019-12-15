import { ApiProperty } from "@nestjs/swagger";

export class PushDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    payload: Record<string, any>;

}

export class PushResponseDto {
    @ApiProperty()
    ok: boolean;
}

export class NPushDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ type: [Object]})
    payload: Record<string, any>[];
}

export class NPopResponseDto {
    @ApiProperty({
        type: [Object]
    })
    payload: Record<string, any>[];
}