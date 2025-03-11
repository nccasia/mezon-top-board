import { ApiProperty } from "@nestjs/swagger";

import { Expose, Type } from "class-transformer";

import { OwnerInMezonAppDetailResponse } from "@features/user/dtos/response";

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
    @Type(() => OwnerInMezonAppDetailResponse)
    public user: OwnerInMezonAppDetailResponse;
}
