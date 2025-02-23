import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { App, Link, LinkType, Rating, Tag, User } from "@domain/entities";

import { BotController } from "./bot.controller";
import { BotService } from "./bot.service";


@Module({
  imports: [TypeOrmModule.forFeature([App, Tag, User, Rating, Link, LinkType])],
  providers: [BotService],
  controllers: [BotController],
  exports: [BotService],
})
export class BotModule { }
