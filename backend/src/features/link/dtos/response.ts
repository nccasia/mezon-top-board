import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

export class SocialLinkInMezonAppDetailResponse {
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