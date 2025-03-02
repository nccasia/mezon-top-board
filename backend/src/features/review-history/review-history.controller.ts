import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

import { RequestWithId } from "@domain/common/dtos/request.dto";
import { User } from "@domain/entities";

import { Public } from "@libs/decorator/authorization.decorator";
import { GetUserFromHeader } from "@libs/decorator/getUserFromHeader.decorator";
import { Logger } from "@libs/logger";

import { CreateAppReviewRequest, GetAppReviewRequest, UpdateAppReviewRequest } from "./dtos/request";
import { ReviewHistoryService } from "./review-history.service";

@Controller("review-history")
@ApiTags("Review history")
export class ReviewHistoryController {
    constructor(
        private readonly appReviewService: ReviewHistoryService,
        private readonly logger: Logger,
    ) {
        this.logger.setContext(ReviewHistoryController.name);
    }

    @ApiBearerAuth()
    @Post()
    @ApiBody({ type: CreateAppReviewRequest })
    async createAppReview(@GetUserFromHeader() user: User, @Body() body: CreateAppReviewRequest) {
        return this.appReviewService.createAppReview(user.id, body);
    }

    @ApiBearerAuth()
    @Put()
    @ApiBody({ type: UpdateAppReviewRequest })
    async updateAppReview(@GetUserFromHeader() user: User, @Body() body: UpdateAppReviewRequest) {
        return this.appReviewService.updateAppReview(user.id, body);
    }

    @ApiBearerAuth()
    @Delete()
    @ApiBody({ type: RequestWithId })
    async deleteAppReview(@GetUserFromHeader() user: User, @Body() body: RequestWithId) {
        return this.appReviewService.deleteAppReview(user.id, body);
    }

    @Public()
    @Get()
    async getAppReviews(@Query() query: GetAppReviewRequest) {
        return this.appReviewService.getAppReviews(query);
    }
}
