import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

import { IsOptional, IsUUID } from "class-validator";

import { PaginationQuery } from "@domain/common/dtos/request.dto";

export class SearchBotRequest extends PaginationQuery {
    @ApiPropertyOptional({ description: "Keyword to search bots by name or headline" })
    @IsOptional()
    search: string;
}

export class GetBotsByTagRequest extends PaginationQuery {
    @ApiProperty({ format: "uuid" })
    @IsUUID()
    tagId: string;
}