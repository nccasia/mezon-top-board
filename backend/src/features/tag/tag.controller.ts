import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { Logger } from "@libs/logger";

import { TagResponse } from "./dtos/response";
import { TagService } from "./tag.service";

@Controller("tag")
@ApiTags("Tag")
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(TagController.name);
  }

  @Get()
  @ApiResponse({ type: TagResponse })
  async getTags() {
    return this.tagService.getTagAll();
  }
}
