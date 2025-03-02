import { BadRequestException, Injectable } from "@nestjs/common";

import { EntityManager } from "typeorm";

import { RequestWithId } from "@domain/common/dtos/request.dto";
import { Result } from "@domain/common/dtos/result.dto";
import { AppStatus } from "@domain/common/enum/appStatus";
import { App, AppReviewHistory, Rating, User } from "@domain/entities";

import { ErrorMessages } from "@libs/constant/errorMsg";
import { GenericRepository } from "@libs/repository/genericRepository";
import { Mapper } from "@libs/utils/mapper";
import { paginate } from "@libs/utils/paginate";

import { CreateAppReviewRequest, GetAppReviewRequest, UpdateAppReviewRequest } from "./dtos/request";
import { AppReviewResponse } from "./dtos/response";

@Injectable()
export class ReviewHistoryService {
    private readonly appRepository: GenericRepository<App>;
    private readonly appReviewRepository: GenericRepository<AppReviewHistory>;
    private readonly userRepository: GenericRepository<User>;
    private readonly ratingRepository: GenericRepository<Rating>;

    constructor(private manager: EntityManager) {
        this.appRepository = new GenericRepository(App, manager);
        this.appReviewRepository = new GenericRepository(AppReviewHistory, manager);
        this.userRepository = new GenericRepository(User, manager);
        this.ratingRepository = new GenericRepository(Rating, manager);
    }

    async createAppReview(userId: string, body: CreateAppReviewRequest) {
        const mezonApp = await this.appRepository.findById(body.appId)
        if (!mezonApp || mezonApp.status !== AppStatus.PUBLISHED)
            throw new BadRequestException(ErrorMessages.INVALID_APP);

        const user = await this.userRepository.findById(userId)
        if (!user)
            throw new BadRequestException(ErrorMessages.INVALID_USER);

        await this.appReviewRepository.create({ ...body, reviewer: userId });
        return new Result()
    }

    async updateAppReview(userId: string, req: UpdateAppReviewRequest) {
        const review = await this.appReviewRepository.findById(req.id)
        if (!review)
            throw new BadRequestException(ErrorMessages.NOT_FOUND_MSG);

        const mezonApp = await this.appRepository.findById(req.appId)
        if (!mezonApp || mezonApp.status !== AppStatus.PUBLISHED)
            throw new BadRequestException(ErrorMessages.INVALID_APP);

        const user = await this.userRepository.findById(userId)
        if (!user)
            throw new BadRequestException(ErrorMessages.INVALID_USER);

        if (review.reviewer !== userId)
            throw new BadRequestException(ErrorMessages.MODIFY_REVIEW_RESTRICTION);

        await this.appReviewRepository.update(req.id, { ...req, reviewer: userId });
        return new Result()
    }

    async deleteAppReview(userId: string, req: RequestWithId) {
        const review = await this.appReviewRepository.findById(req.id)
        if (!review)
            throw new BadRequestException(ErrorMessages.NOT_FOUND_MSG);

        if (review.reviewer !== userId)
            throw new BadRequestException(ErrorMessages.MODIFY_REVIEW_RESTRICTION);

        await this.appReviewRepository.softDelete(req.id);
        return new Result()
    }

    async getAppReviews(query: GetAppReviewRequest) {
        const mezonApp = await this.appRepository.findById(query.appId)
        if (!mezonApp || mezonApp.status !== AppStatus.PUBLISHED)
            throw new BadRequestException(ErrorMessages.INVALID_APP);

        return paginate<AppReviewHistory, AppReviewResponse>(
            () => this.appReviewRepository.findMany(
                {
                    ...query,
                    where: () => ({ appId: query.appId })
                }),
            query.pageSize,
            query.pageNumber,
            async (entity) => {
                const mappedReviewHistory = Mapper(AppReviewResponse, entity);

                const user = await this.userRepository.findById(entity.reviewer)

                const rating = await this.ratingRepository.getRepository().findOne({
                    where: {
                        appId: query.appId,
                        userId: entity.reviewer
                    },
                })

                mappedReviewHistory.reviewerName = user.name.length > 0 ? user.name : user.email
                mappedReviewHistory.rateScore = rating ? rating.score : 0

                return mappedReviewHistory;
            },
        );
    }
}
