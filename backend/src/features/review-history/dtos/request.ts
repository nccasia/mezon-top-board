import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";

import { PaginationQuery, RequestWithId } from "@domain/common/dtos/request.dto";

export class CreateAppReviewRequest {
    @ApiProperty()
    @IsString()
    appId: string;

    @ApiProperty()
    @IsString()
    remark: string;
}

export class UpdateAppReviewRequest extends RequestWithId {
    @ApiProperty()
    @IsString()
    appId: string;

    @ApiProperty()
    @IsString()
    remark: string;
}

export class GetAppReviewRequest extends PaginationQuery {
    @ApiProperty()
    @IsString()
    appId: string;
}