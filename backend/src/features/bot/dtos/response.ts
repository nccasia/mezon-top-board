import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

export class GetBotDetailsResponse {
    @Expose()
    @ApiProperty()
    public id: string;
    @Expose()
    @ApiProperty()
    public name: string;
    @Expose()
    @ApiProperty()
    public description: string;
    @Expose()
    @ApiProperty()
    public headline: string;
    @Expose()
    @ApiProperty()
    public featuredImage: string;
}

export class GetRelatedBotResponse {
    @Expose()
    @ApiProperty()
    public id: string;
    @Expose()
    @ApiProperty()
    public name: string;
}

