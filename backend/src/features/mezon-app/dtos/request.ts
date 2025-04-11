import { ApiPropertyOptional, ApiProperty, OmitType, PartialType, IntersectionType } from "@nestjs/swagger";

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
  Matches, 
  ArrayMinSize 
} from 'class-validator';

import { PaginationQuery, RequestWithId } from "@domain/common/dtos/request.dto";
const URI_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/


export class SearchMezonAppRequest extends PaginationQuery {
    @ApiPropertyOptional({ description: "Keyword to search mezonApps by name or headline" })
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
    url: string;

    @ApiPropertyOptional()
    @IsUUID()
    linkTypeId: string;
}

export class CreateMezonAppRequest {
    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    @MaxLength(50, { message: 'Name must not exceed 50 characters' })
    name: string;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isAutoPublished?: boolean;

    @ApiPropertyOptional()
    @IsString()
    @Matches(URI_REGEX, { 
      message: 'Invalid URI format' 
    })
    @IsOptional()
    installLink?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @MinLength(50, { message: 'Headline must be at least 50 characters' })
    @MaxLength(510, { message: 'Headline must not exceed 510 characters' })
    headline?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @MinLength(1, { message: 'Prefix must be at least 1 character' })
    @MaxLength(10, { message: 'Prefix must not exceed 10 characters' })
    prefix?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    featuredImage?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Matches(URI_REGEX, { 
      message: 'Invalid URI format' 
    })
    supportUrl?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    remark?: string;

    @ApiPropertyOptional()
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one tag is required' })
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
    PartialType(OmitType(CreateMezonAppRequest, [] as const))
) { }