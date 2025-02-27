import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

import { Logger } from "@libs/logger";

import { Public } from "@libs/decorator/authorization.decorator";
import { AuthService } from "./auth.service";
import { OAuth2Request, RefreshTokenDto } from "./dtos/request";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Public()
  @Post("verify-oauth2")
  @ApiBody({ type: OAuth2Request })
  async verifyOAuth2(@Body() body: OAuth2Request) {
    try {
      return await this.authService.verifyOAuth2(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Public()
  @Post("refresh-token")
  @ApiBody({ type: RefreshTokenDto })
  @ApiOperation({
    summary: "Get new access token and refresh token",
  })
  async refreshAccessToken(@Body() { refreshToken }: RefreshTokenDto) {
    return await this.authService.verifyRefreshToken(refreshToken);
  }
}
