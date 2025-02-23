import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";

import { SocialLinkInBotDetailResponse } from "@features/link/dtos/response";
import { TagInBotDetailResponse } from "@features/tag/dtos/response";
import { OwnerInBotDetailResponse } from "@features/user/dtos/response";

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
    @Expose()
    @ApiProperty({ type: () => OwnerInBotDetailResponse })
    public owner: OwnerInBotDetailResponse;
    @Expose()
    @ApiProperty({ type: () => [TagInBotDetailResponse] })
    public tags: TagInBotDetailResponse[];
    @Expose()
    @ApiProperty({ type: () => [SocialLinkInBotDetailResponse] })
    public socialLinks: SocialLinkInBotDetailResponse[];
    @Expose()
    @ApiProperty()
    public rateScore: number;
}

export class GetRelatedBotResponse {
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

export class SearchBotResponse extends GetRelatedBotResponse {
    @Expose()
    @ApiProperty()
    public description: string;
    @Expose()
    @ApiProperty()
    public headline: string;
}

