import { multerConfig } from "@config/files.config";
import { Media } from "@domain/entities";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    MulterModule.register(multerConfig),
  ],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule { }
