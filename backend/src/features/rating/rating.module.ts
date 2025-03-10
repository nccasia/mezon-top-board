import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Rating, User } from "@domain/entities";

import { RatingController } from "./rating.controller";
import { RatingService } from "./rating.service";


@Module({
    imports: [TypeOrmModule.forFeature([Rating, User])],
    providers: [RatingService],
    controllers: [RatingController],
    exports: [RatingService],
})
export class RatingModule {}
