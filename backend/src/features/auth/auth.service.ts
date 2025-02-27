import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { EntityManager } from "typeorm";

import { Result } from "@domain/common/dtos/result.dto";
import { User } from "@domain/entities";

import config from "@config/env.config";
import { GenericRepository } from "@libs/repository/genericRepository";
import { JwtService } from "@nestjs/jwt";
import { isEmail } from "class-validator";
import * as crypto from "crypto";
import * as moment from "moment";
import { OAuth2Request } from "./dtos/request";
import { JwtPayload } from "./dtos/response";
import { OAuth2Service } from "./oauth2.service";
import { Role } from "@domain/common/enum/role";
import { EXPIRED_REFRESH_TOKEN } from "@libs/constant/errorMsg";

@Injectable()
export class AuthService {
  private readonly userRepository: GenericRepository<User>;
  constructor(
    private manager: EntityManager,
    private readonly jwtService: JwtService,
    private readonly oauth2Service: OAuth2Service,
  ) {
    this.userRepository = new GenericRepository(User, manager);
  }

  async verifyOAuth2(payload: OAuth2Request): Promise<Result> {
    try {
      const data = await this.oauth2Service.getOAuth2Token(payload);

      const oryInfo = await this.oauth2Service.decodeORYTokenOAuth2(
        data.access_token,
      );

      if (!isEmail(oryInfo.sub)) {
        throw new BadRequestException();
      }

      const user = await this.findUserByEmail(oryInfo.sub);

      if (user) {
        const tokens = await this.generateAccessAndRefreshTokens(user);
        return new Result({ data: tokens });
      }

      const newUser = await this.userRepository.create({
        email: oryInfo.sub,
        role: Role.DEVELOPER,
      });
      const tokens = await this.generateAccessAndRefreshTokens(newUser);
      return new Result({ data: tokens });
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
          deletedAt: null,
        },
      });
      return user;
    } catch {
      return;
    }
  }

  async generateAccessAndRefreshTokens(
    user: User,
    providedSessionToken?: string,
  ) {
    const { email } = user;
    const {
      JWT_ACCESS_TOKEN_SECRET: secret,
      JWT_REFRESH_TOKEN_SECRET: refreshSecret,
      JWT_ACCESS_TOKEN_EXPIRES_IN_MINUTES: accessTokenExpiration,
      JWT_REFRESH_TOKEN_EXPIRES_IN_MINUTES: refreshTokenExpiration,
    } = config();

    const sessionToken =
      providedSessionToken ?? crypto.randomBytes(5).toString("hex");

    const expireTime = moment().add(accessTokenExpiration, "minutes").toDate();
    const refreshTokenExpireTime = moment()
      .add(refreshTokenExpiration, "minutes")
      .toDate();

    const accessToken = this.jwtService.sign(
      { email, sessionToken, expireTime },
      {
        secret: secret,
      },
    );

    const refreshToken = this.jwtService.sign(
      { email, sessionToken, expireTime: refreshTokenExpireTime },
      {
        secret: refreshSecret,
      },
    );
    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const payload: JwtPayload = this.jwtService.verify(refreshToken, {
        secret: config().JWT_REFRESH_TOKEN_SECRET,
      });

      const { sessionToken, email, expireTime } = payload;

      if (!isEmail(email)) {
        throw new UnauthorizedException();
      }

      const user = await this.findUserByEmail(email);

      if (!user) {
        throw new UnauthorizedException();
      }

      const expireDate = new Date(expireTime);
      const now = new Date().getTime();

      if (
        !expireTime ||
        isNaN(expireDate.getTime()) ||
        now > expireDate.getTime()
      ) {
        throw new ForbiddenException(EXPIRED_REFRESH_TOKEN);
      }

      const tokens = await this.generateAccessAndRefreshTokens(
        user,
        sessionToken,
      );

      return new Result({ data: tokens });
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      throw new UnauthorizedException();
    }
  }
}
