import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { App, Link, LinkType, Rating, Tag, User } from "@domain/entities";

import { MezonAppController } from "./mezon-app.controller";
import { MezonAppService } from "./mezon-app.service";


@Module({
  imports: [TypeOrmModule.forFeature([App, Tag, User, Rating, Link, LinkType])],
  providers: [MezonAppService],
  controllers: [MezonAppController],
  exports: [MezonAppService],
})
export class MezonAppModule { }
