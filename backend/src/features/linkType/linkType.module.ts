import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Link } from "@domain/entities";

import { LinkTypeController } from "./linkType.controller";
import { LinkTypeService } from "./linkType.service";

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkTypeService],
  controllers: [LinkTypeController],
  exports: [LinkTypeService],
})
export class LinkTypeModule {}
