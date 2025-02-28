import { USER_TOKEN } from "@libs/constant/meta-key.constant";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { isEmail } from "class-validator";
import { ClsService } from "nestjs-cls";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ValidateJwtRequest } from "../dtos/request";
import { JwtPayload } from "../dtos/response";

import config from "@config/env.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config().JWT_ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: ValidateJwtRequest, payload: JwtPayload) {
    const { email, expireTime, sessionToken } = payload;

    if (!isEmail(email)) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`User ${email} does not found`);
    }

    const now = new Date().getTime();
    const expireDate = new Date(expireTime);

    if (isNaN(expireDate.getTime()) || now > expireDate.getTime()) {
      throw new UnauthorizedException("JWT token is expired");
    }

    request.sessionToken = sessionToken;
    return user;
  }
}
