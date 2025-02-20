import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { dataSourceOption } from "@config/data-source.config";
import config, { envFilePath } from "@config/env.config";

import { BotModule } from "@features/bot/bot.module";
import { MediaModule } from "@features/media/media.module";

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
    BotModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
