import { Controller, Get, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { RequestWithId } from "@domain/common/dtos/request.dto";

import { Logger } from "@libs/logger";

import { BotService } from "./bot.service";
import { GetBotsByTagRequest, SearchBotRequest } from "./dtos/request";
import { GetBotDetailsResponse, GetRelatedBotResponse } from "./dtos/response";


@Controller("bot")
@ApiTags("Bot")
export class BotController {
  constructor(
    private readonly botService: BotService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(BotController.name);
  }

  @Get()
  @ApiResponse({ type: GetBotDetailsResponse })
  getBotDetail(@Query() query: RequestWithId) {
    try {
      return this.botService.getBotDetail(query);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Get("related-bot")
  @ApiResponse({ type: GetRelatedBotResponse, isArray: true })
  getRelatedBot(@Query() query: RequestWithId) {
    try {
      return this.botService.getRelatedBot(query);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Get("search")
  searchBot(@Query() query: SearchBotRequest) {
    try {
      return this.botService.searchBot(query);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }

  @Get("get-by-tag")
  getBotsByTag(@Query() query: GetBotsByTagRequest) {
    try {
      return this.botService.getBotsByTag(query);
    } catch (error) {
      this.logger.error("An error occured", error);
      throw error;
    }
  }
}
