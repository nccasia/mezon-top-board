import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { RequestWithId } from "@domain/common/dtos/request.dto";

import { Logger } from "@libs/logger";

import { CreateMediaRequest, DeleteMediaRequest, GetMediaRequest, UpdateMediaRequest } from "./dtos/request";
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
  getAllMedia(@Query() query: GetMediaRequest) {
    try {
      return this.mediaService.getAll(query);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Get()
  getMedia(@Query() query: RequestWithId) {
    try {
      return this.mediaService.getMedia(query);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Post()
  @ApiBody({ type: CreateMediaRequest })
  createMedia(@Body() body: CreateMediaRequest) {
    try {
      return this.mediaService.createMedia(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Delete()
  @ApiBody({ type: DeleteMediaRequest })
  deleteMedia(@Body() body: DeleteMediaRequest) {
    try {
      return this.mediaService.deleteMedia(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Put()
  @ApiBody({ type: UpdateMediaRequest })
  updateMedia(@Body() body: UpdateMediaRequest) {
    try {
      return this.mediaService.update(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }
}
