import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RequestWithId } from "@domain/common/dtos/request.dto";

import { Logger } from "@libs/logger";

import { CreateMezonAppRequest, SearchMezonAppRequest, UpdateMezonAppRequest } from "./dtos/request";
import { GetMezonAppDetailsResponse, GetRelatedMezonAppResponse } from "./dtos/response";
import { MezonAppService } from "./mezon-app.service";


@Controller("mezon-app")
@ApiTags("MezonApp")
export class MezonAppController {
  constructor(
    private readonly mezonAppService: MezonAppService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(MezonAppController.name);
  }

  @Get()
  @ApiResponse({ type: GetMezonAppDetailsResponse })
  getMezonAppDetail(@Query() query: RequestWithId) {
    try {
      return this.mezonAppService.getMezonAppDetail(query);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Get("related-app")
  @ApiResponse({ type: GetRelatedMezonAppResponse, isArray: true })
  getRelatedMezonApp(@Query() query: RequestWithId) {
    try {
      return this.mezonAppService.getRelatedMezonApp(query);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Get("search")
  searchMezonApp(@Query() query: SearchMezonAppRequest) {
    try {
      return this.mezonAppService.searchMezonApp(query);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Delete()
  @ApiBody({ type: RequestWithId })
  deleteMezonApp(@Body() body: RequestWithId) {
    try {
      return this.mezonAppService.deleteMezonApp(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Post()
  @ApiBody({ type: CreateMezonAppRequest })
  createMezonApp(@Body() body: CreateMezonAppRequest) {
    try {
      return this.mezonAppService.createMezonApp(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Put()
  @ApiBody({ type: UpdateMezonAppRequest })
  updateMezonApp(@Body() body: UpdateMezonAppRequest) {
    try {
      return this.mezonAppService.updateMezonApp(body);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }
}
