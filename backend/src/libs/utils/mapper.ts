import { plainToInstance } from "class-transformer";

export function Mapper<T>(cls: new () => T, plain: object): T {
  return plainToInstance(cls, plain, { excludeExtraneousValues: true });
}
