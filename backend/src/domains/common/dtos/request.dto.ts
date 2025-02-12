import { IsNotEmpty, IsString } from "class-validator";

export class IRequest {
  @IsNotEmpty()
  @IsString()
  id: string;
  constructor(id?: string) {
    if (id) this.id = id;
  }
}
