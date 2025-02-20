import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { App, Tag } from "@domain/entities";

import { BotController } from "./bot.controller";
import { BotService } from "./bot.service";


@Module({
  imports: [TypeOrmModule.forFeature([App, Tag])],
  providers: [BotService],
  controllers: [BotController],
  exports: [BotService],
})
export class BotModule {}
