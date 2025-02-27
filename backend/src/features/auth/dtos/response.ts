import { IsEmail, IsNumber, IsDate } from "class-validator";

export class OAuth2RequestResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string = "bearer";
}

export class OAuth2JwtPayload {
  amr: string[];
  at_hash: string;
  aud: string[];
  auth_time: number;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  rat: number;
  sid: string;
  sub: string;
}

export class OAuth2ORYTokenPayload {
  aud: string[];
  auth_time: number;
  iat: number;
  iss: string;
  rat: number;
  sub: string;
}

export class JwtPayload {
  @IsEmail()
  email: string;

  @IsNumber()
  iat: number;

  sessionToken: string;

  @IsDate()
  expireTime?: string | Date;
}
