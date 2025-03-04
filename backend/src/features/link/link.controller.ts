import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { Public } from "@libs/decorator/authorization.decorator";
import { Logger } from "@libs/logger";

import { SocialLinkInMezonAppDetailResponse } from "./dtos/response";
import { LinkService } from "./link.service";

@Controller("link")
@ApiTags("Link")
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(LinkController.name);
  }

  @Public()
  @Get()
  @ApiResponse({ type: SocialLinkInMezonAppDetailResponse })
  async getAllLinks() {
    return await this.linkService.getAllSocialLinks();
  }
}
