import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString } from "class-validator";

import { PaginationQuery, RequestWithId } from "@domain/common/dtos/request.dto";
export class GetMediaRequest extends PaginationQuery { }

export class CreateMediaRequest {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;
}

export class DeleteMediaRequest extends RequestWithId { }

export class UpdateMediaRequest extends RequestWithId {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;
}
