import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { Logger } from "@libs/logger";

import { MediaService } from "./media.service";

@Controller("media")
@ApiTags("Media")
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(MediaController.name);
  }
  @Get("search")
  getAllMedia() {
    try {
      return this.mediaService.getAll();
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }
}
