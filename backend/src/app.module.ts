import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { dataSourceOption } from "@config/data-source.config";
import config, { envFilePath } from "@config/env.config";

import { MediaModule } from "@features/media/media.module";
import { MezonAppModule } from "@features/mezon-app/mezon-app.module";
import { TagModule } from "@features/tag/tag.module";

import { LoggerModule } from "@libs/logger";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: envFilePath,
    }),
    TypeOrmModule.forRoot(dataSourceOption),
    LoggerModule,
    MediaModule,
    MezonAppModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
