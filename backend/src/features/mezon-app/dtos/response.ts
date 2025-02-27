import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

import { SocialLinkInMezonAppDetailResponse } from "@features/link/dtos/response";
import { TagInMezonAppDetailResponse } from "@features/tag/dtos/response";
import { OwnerInMezonAppDetailResponse } from "@features/user/dtos/response";

export class GetMezonAppDetailsResponse {
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
    @Expose()
    @ApiProperty({ type: () => OwnerInMezonAppDetailResponse })
    public owner: OwnerInMezonAppDetailResponse;
    @Expose()
    @ApiProperty({ type: () => [TagInMezonAppDetailResponse] })
    public tags: TagInMezonAppDetailResponse[];
    @Expose()
    @ApiProperty({ type: () => [SocialLinkInMezonAppDetailResponse] })
    public socialLinks: SocialLinkInMezonAppDetailResponse[];
    @Expose()
    @ApiProperty()
    public rateScore: number;
}

export class GetRelatedMezonAppResponse {
    @Expose()
    @ApiProperty()
    public id: string;
    @Expose()
    @ApiProperty()
    public name: string;
    @Expose()
    @ApiProperty()
    public featuredImage: string;
    @Expose()
    @ApiProperty()
    public rateScore: number;
}

export class SearchMezonAppResponse extends GetRelatedMezonAppResponse {
    @Expose()
    @ApiProperty()
    public description: string;
    @Expose()
    @ApiProperty()
    public headline: string;
    @Expose()
    @ApiProperty({ type: () => [TagInMezonAppDetailResponse] })
    public tags: TagInMezonAppDetailResponse[];
}

