import { RequestWithId } from "@domain/common/dtos/request.dto";
import { Logger } from "@libs/logger";
import { Body, Controller, Delete, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreateMediaRequest, DeleteMediaRequest, GetMediaRequest } from "./dtos/request";
import { MediaService } from "./media.service";
import { GetUserFromHeader } from "@libs/decorator/getUserFromHeader.decorator";
import { User } from "@domain/entities";

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
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateMediaRequest })
  createMedia(@GetUserFromHeader() user: User, @Body() body: CreateMediaRequest, @UploadedFile() file: Express.Multer.File) {
    try {
      return this.mediaService.createMedia(user.id, body, file);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Delete()
  @ApiBearerAuth()
  @ApiBody({ type: DeleteMediaRequest })
  deleteMedia(@Body() body: DeleteMediaRequest) {
    try {
      return this.mediaService.deleteMedia(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }
}
