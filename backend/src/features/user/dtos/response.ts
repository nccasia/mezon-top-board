import { ApiProperty, OmitType } from "@nestjs/swagger";

import { Expose } from "class-transformer";

export class OwnerInMezonAppDetailResponse {
    @Expose()
    @ApiProperty()
    public id: string;
    @Expose()
    @ApiProperty()
    public name: string;
}

export class SearchUserResponse {
    @Expose()
    @ApiProperty()
    public id: string;
    @Expose()
    @ApiProperty()
    public name: string;
    @Expose()
    @ApiProperty()
    public email: string;
    @Expose()
    @ApiProperty()
    public bio: string;
    @Expose()
    @ApiProperty()
    public role: string;
    @Expose()
    @ApiProperty()
    public profileImage: string;
}

export class ReviewerResponse {
    @Expose()
    @ApiProperty()
    public id: string;
    @Expose()
    @ApiProperty()
    public name: string;
    @Expose()
    @ApiProperty()
    public email: string;
    @Expose()
    @ApiProperty()
    public role: string;
}

export class GetUserDetailsResponse extends OmitType(SearchUserResponse, ["role"]) {
}
export class GetUserPublicInfoResponse extends OmitType(SearchUserResponse, ["role", "email"]) {
}