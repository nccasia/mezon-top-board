import { Expose } from "class-transformer";

export class GetMediaResponse {
  @Expose()
  public name: string;
}
