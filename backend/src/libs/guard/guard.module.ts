import { Module } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class GuardModule {}
