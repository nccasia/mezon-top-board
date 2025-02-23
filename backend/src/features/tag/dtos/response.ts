import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

export class TagInBotDetailResponse {
    @Expose()
    @ApiProperty()
    public id: string;
    @Expose()
    @ApiProperty()
    public name: string;
}