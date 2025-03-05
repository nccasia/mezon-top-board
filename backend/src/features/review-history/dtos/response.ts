import { MezonAppInAppReviewResponse } from "@features/mezon-app/dtos/response";
import { ReviewerResponse } from "@features/user/dtos/response";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Expose } from "class-transformer";

export class AppReviewResponse {
    @Expose()
    @ApiProperty()
    public id: string;

    @Expose()
    @ApiProperty()
    public remark: string;

    @Expose()
    @ApiProperty({ type: () => ReviewerResponse })
    public reviewer: ReviewerResponse;

    @Expose()
    @ApiProperty()
    public reviewedAt: Date;

    @Expose()
    @ApiPropertyOptional({ type: () => MezonAppInAppReviewResponse })
    public app?: MezonAppInAppReviewResponse;
}