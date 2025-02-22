import { ApiProperty } from "@nestjs/swagger";

import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { SortOrder } from "../enum/sortOder";

export class RequestWithId {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
  constructor(id?: string) {
    if (id) this.id = id;
  }
}

export class PaginationQuery {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  pageSize: number = 10;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  pageNumber: number = 1;

  @IsOptional()
  sortField: string = "createdAt";

  @IsOptional()
  @IsIn([SortOrder.ASC, SortOrder.DESC])
  sortOrder: SortOrder = SortOrder.DESC;
}