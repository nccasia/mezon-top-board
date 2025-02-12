import { Transform } from "class-transformer";
import { IsOptional, IsIn } from "class-validator";

import { SortDirection } from "../enum/sortOder";

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
  @IsIn([SortDirection.ASC, SortDirection.DESC])
  sortDirection: SortDirection = SortDirection.DESC;

  @IsOptional()
  filters?: string;
}

export class PaginationResponse {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  pageSize?: number = 10;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  pageNumber?: number = 1;

  @IsOptional()
  sortField?: string = "createdAt";

  @IsOptional()
  @IsIn([SortDirection.ASC, SortDirection.DESC])
  sortDirection?: SortDirection = SortDirection.DESC;

  @IsOptional()
  filters?: string;
}
