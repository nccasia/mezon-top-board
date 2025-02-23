import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

export class SocialLinkInBotDetailResponse {
    @Expose()
    @ApiProperty()
    public id: string;
    @Expose()
    @ApiProperty()
    public url: string;
    @Expose()
    @ApiProperty()
    public icon: string;
}