import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsString } from "class-validator";

import { RequestWithId } from "@domain/common/dtos/request.dto";
export class CreateTagRequest {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    slug: string;
}

export class UpdateTagRequest extends RequestWithId {
    @ApiPropertyOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    slug: string;
}