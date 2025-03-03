import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

export class AppReviewResponse {
    @Expose()
    @ApiProperty()
    public id: string;

    @Expose()
    @ApiProperty()
    public remark: string;

    @Expose()
    @ApiProperty()
    public reviewer: string;

    @Expose()
    @ApiProperty()
    public reviewerName: string;

    @Expose()
    @ApiProperty()
    public rateScore: number;

    @Expose()
    @ApiProperty()
    public reviewedAt: Date;
}