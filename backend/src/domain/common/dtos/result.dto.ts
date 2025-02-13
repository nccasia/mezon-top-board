import { HttpStatus } from "@nestjs/common";

export class Result<T = unknown> {
  public statusCode?: HttpStatus = HttpStatus.OK;
  public message?: string = "Successfully";
  public data?: T | T[] = undefined;
  public pageSize?: number = undefined;
  public pageNumber?: number = undefined;
  public totalPages?: number = undefined;
  public totalCount?: number = undefined;
  public hasPreviousPage?: boolean = undefined;
  public hasNextPage?: boolean = undefined;

  constructor(init?: Partial<Result<T>>) {
    Object.assign(this, init);
  }
}
