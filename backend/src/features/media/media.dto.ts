import { Expose } from "class-transformer";

export class GetUserResponse {
  @Expose()
  public name: string;
}
