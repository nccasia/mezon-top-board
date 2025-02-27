import { Module } from "@nestjs/common";

import { User } from "@domain/entities";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClsModule } from "nestjs-cls";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { OAuth2Service } from "./oauth2.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    PassportModule,
    ClsModule,
  ],
  providers: [AuthService, JwtStrategy, OAuth2Service],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
