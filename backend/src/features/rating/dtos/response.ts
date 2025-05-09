import { ApiProperty, OmitType } from "@nestjs/swagger";

import { Expose, Type } from "class-transformer";

import { OwnerInAppRatingResponse } from "@features/user/dtos/response";

export class GetAppRatingResponse {
  @Expose()
  @ApiProperty()
  public id: string;
  @Expose()
  @ApiProperty()
  public score: number;
  @Expose()
  @ApiProperty()
  public comment: string;
  @Expose()
  @ApiProperty()
  public updatedAt: Date;
  @Expose()
  @ApiProperty()
  @Type(() => OwnerInAppRatingResponse)
  public user: OwnerInAppRatingResponse;
}

export class GetAllAppRatingResponse extends OmitType(GetAppRatingResponse, [
  "user",
]) {}


export class CreateAppRatingResponse extends GetAppRatingResponse {}
