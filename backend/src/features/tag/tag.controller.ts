import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RequestWithId } from "@domain/common/dtos/request.dto";

import { Public } from "@libs/decorator/authorization.decorator";
import { Logger } from "@libs/logger";

import { CreateTagRequest, UpdateTagRequest } from "./dtos/request";
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

  @Public()
  @Get()
  @ApiResponse({ type: TagResponse })
  async getTags() {
    return this.tagService.getTagAll();
  }

  @Public()
  @Post()
  @ApiBody({ type: CreateTagRequest })
  createTag(@Body() body: CreateTagRequest) {
    try {
      return this.tagService.createTag(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Public()
  @Put()
  @ApiBody({ type: UpdateTagRequest })
  updateTag(@Body() body: UpdateTagRequest) {
    try {
      return this.tagService.updateTag(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Public()
  @Delete()
  @ApiBody({ type: RequestWithId })
  deleteTag(@Body() body: RequestWithId) {
    try {
      return this.tagService.deleteTag(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }
}
