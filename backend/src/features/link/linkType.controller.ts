import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { Public } from "@libs/decorator/authorization.decorator";
import { Logger } from "@libs/logger";

import { SocialLinkInMezonAppDetailResponse } from "./dtos/response";
import { LinkTypeService } from "./linkType.service";

@Controller("link-type")
@ApiTags("LinkType")
export class LinkTypeController {
  constructor(
    private readonly linkService: LinkTypeService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(LinkTypeController.name);
  }

  @Public()
  @Get()
  @ApiResponse({ type: SocialLinkInMezonAppDetailResponse })
  async getAllLinks() {
    return await this.linkService.getAllSocialLinks();
  }
}
