import { Request } from "express";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "@domain/entities";

export class OAuth2Request {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  scope?: string | string[] | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state?: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class ValidateJwtRequest extends Request {
  user?: User;
  sessionToken?: string;
}
