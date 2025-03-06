import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Expose, Type } from "class-transformer";

import { MezonAppInAppReviewResponse } from "@features/mezon-app/dtos/response";
import { ReviewerResponse } from "@features/user/dtos/response";

export class AppReviewResponse {
  @Expose()
  @ApiProperty()
  public id: string;

  @Expose()
  @ApiProperty()
  public remark: string;

  @Expose()
  @ApiProperty({ type: () => ReviewerResponse })
  @Type(() => ReviewerResponse)
  public reviewer: ReviewerResponse;

  @Expose()
  @ApiProperty()
  public reviewedAt: Date;

  @Expose()
  @ApiPropertyOptional({ type: () => MezonAppInAppReviewResponse })
  @Type(() => MezonAppInAppReviewResponse)
  public app?: MezonAppInAppReviewResponse;
}
