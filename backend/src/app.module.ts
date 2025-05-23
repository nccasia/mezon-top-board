import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { dataSourceOption } from "@config/data-source.config";
import config, { envFilePath } from "@config/env.config";

import { AuthModule } from "@features/auth/auth.module";
import { LinkTypeModule } from "@features/linkType/linkType.module";
import { MediaModule } from "@features/media/media.module";
import { MezonAppModule } from "@features/mezon-app/mezon-app.module";
import { RatingModule } from "@features/rating/rating.module";
import { ReviewHistoryModule } from "@features/review-history/review-history.module";
import { TagModule } from "@features/tag/tag.module";
import { UserModule } from "@features/user/user.module";

import { GuardModule } from "@libs/guard/guard.module";
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
    AuthModule,
    GuardModule,
    TagModule,
    ReviewHistoryModule,
    UserModule,
    LinkTypeModule,
    RatingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
