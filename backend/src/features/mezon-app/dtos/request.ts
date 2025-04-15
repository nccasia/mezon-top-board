import {
  ApiPropertyOptional,
  ApiProperty,
  OmitType,
  PartialType,
  IntersectionType,
} from "@nestjs/swagger";

import { Type } from "class-transformer";
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
  MinLength,
  MaxLength,
  ArrayMinSize,
  IsUrl,
  ValidateIf,
} from "class-validator";

import {
  PaginationQuery,
  RequestWithId,
} from "@domain/common/dtos/request.dto";

export class SearchMezonAppRequest extends PaginationQuery {
  @ApiPropertyOptional({
    description: "Keyword to search mezonApps by name or headline",
  })
  @IsOptional()
  search: string;

  @ApiPropertyOptional()
  @IsOptional()
  tags: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  ownerId: string;
}

class SocialLinkDto {
  @ApiPropertyOptional()
  @IsString()
  @ValidateIf(o => o.url !== '' && o.url !== null)
  @IsUrl(undefined, { message: "SocialLink Invalid URL format" })
  url: string;

  @ApiPropertyOptional()
  @IsUUID()
  linkTypeId: string;
}

export class CreateMezonAppRequest {
  @ApiProperty()
  @IsString()
  @MinLength(3, { message: "Name must be at least 3 characters" })
  @MaxLength(128, { message: "Name must not exceed 128 characters" })
  name: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isAutoPublished?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ValidateIf(o => o.installLink !== '' && o.installLink !== null)
  @IsUrl(undefined, { message: "Install Link Invalid URL format" })
  installLink?: string;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(50, { message: "Headline must be at least 50 characters" })
  @MaxLength(510, { message: "Headline must not exceed 510 characters" })
  headline?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(1, { message: "Prefix must be at least 1 character" })
  @MaxLength(10, { message: "Prefix must not exceed 10 characters" })
  prefix?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  featuredImage?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @ValidateIf(o => o.supportUrl !== '' && o.supportUrl !== null)
  @IsUrl(undefined, { message: "Support URL Invalid URL format" })
  supportUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiPropertyOptional()
  @IsArray()
  @ArrayMinSize(1, { message: "At least one tag is required" })
  @IsString({ each: true })
  tagIds?: string[];

  @ApiPropertyOptional({ type: [SocialLinkDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLinks?: SocialLinkDto[];
}

export class UpdateMezonAppRequest extends IntersectionType(
  RequestWithId,
  PartialType(OmitType(CreateMezonAppRequest, [] as const)),
) {}
