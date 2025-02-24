import { ApiPropertyOptional, ApiProperty, OmitType, PartialType, IntersectionType } from "@nestjs/swagger";

import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

import { PaginationQuery, RequestWithId } from "@domain/common/dtos/request.dto";

export class SearchMezonAppRequest extends PaginationQuery {
    @ApiPropertyOptional({ description: "Keyword to search mezonApps by name or headline" })
    @IsOptional()
    search: string;
    @ApiPropertyOptional({ description: "A valid column of MezonApp (tags, ratings, socialLinks)" })
    @IsString()
    @IsOptional()
    field: string;
    @ApiPropertyOptional({ description: "ID value of the field" })
    @IsUUID()
    @IsOptional()
    fieldId: string;
}

export class CreateMezonAppRequest {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isAutoPublished?: boolean;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    installLink?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    headline?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    prefix?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    featuredImage?: string;

    @ApiProperty()
    @IsUUID()
    ownerId: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    supportUrl?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    remark?: string;

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    tagIds?: string[];

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    socialLinkIds?: string[];
}

export class UpdateMezonAppRequest extends IntersectionType(
    RequestWithId,
    PartialType(OmitType(CreateMezonAppRequest, ["ownerId"] as const))
) { }