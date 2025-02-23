import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

import { IsOptional, IsString, IsUUID } from "class-validator";

import { PaginationQuery } from "@domain/common/dtos/request.dto";

export class SearchBotRequest extends PaginationQuery {
    @ApiPropertyOptional({ description: "Keyword to search bots by name or headline" })
    @IsOptional()
    search: string;
}

export class FilterBotRequest extends PaginationQuery {
    @ApiProperty({ description: "A valid column of Bot (tags, ratings, socialLinks)" })
    @IsString()
    field: string;

    @ApiProperty({ description: "ID value of the field" })
    @IsUUID()
    fieldId: string;
}