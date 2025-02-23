import { Injectable } from "@nestjs/common";

import { EntityManager, In, Not } from "typeorm";

import { RequestWithId } from "@domain/common/dtos/request.dto";
import { Result } from "@domain/common/dtos/result.dto";
import { AppStatus } from "@domain/common/enum/appStatus";
import { App, Tag, User } from "@domain/entities";

import { GenericRepository } from "@libs/repository/genericRepository";
import { Mapper } from "@libs/utils/mapper";
import { paginate } from "@libs/utils/paginate";
import { filterBuilder, searchBuilder } from "@libs/utils/queryBuilder";

import { FilterBotRequest, SearchBotRequest } from "./dtos/request";
import { GetBotDetailsResponse, GetRelatedBotResponse, SearchBotResponse } from "./dtos/response";

@Injectable()
export class BotService {
    private readonly appRepository: GenericRepository<App>;
    private readonly userRepository: GenericRepository<User>;
    private readonly tagRepository: GenericRepository<Tag>;


    constructor(private manager: EntityManager) {
        this.appRepository = new GenericRepository(App, manager);
        this.userRepository = new GenericRepository(User, manager);
        this.tagRepository = new GenericRepository(Tag, manager);
    }
    /**
    *  Calculate the average rating and round to the nearest 0.1 increment
    */
    private getAverageRating(bot: App) {
        return bot.ratings.length
            ? Math.round((bot.ratings.reduce((sum, rating) => sum + rating.score, 0) / bot.ratings.length) * 10) / 10
            : 0;
    }

    async getBotDetail(query: RequestWithId) {
        const bot = await this.appRepository.findById(query.id, ["tags", "socialLinks", "socialLinks.type", "ratings"])
        if (!bot || bot.status !== AppStatus.PUBLISHED)
            return new Result({ data: {} })
        else {
            const owner = await this.userRepository.findById(bot.ownerId);

            const detail = Mapper(GetBotDetailsResponse, bot);

            detail.rateScore = this.getAverageRating(bot)
            detail.owner = {
                id: owner.id,
                name: owner.name,
            }
            detail.tags = bot.tags.map(tag => ({ id: tag.id, name: tag.name }))
            detail.socialLinks = bot.socialLinks.map(link => ({ id: link.id, url: link.url, icon: link.type.icon ?? "" }))

            return new Result({
                data: detail,
            });
        }
    }

    async getRelatedBot(query: RequestWithId) {
        const bot = await this.appRepository.findById(query.id, ["tags"]);

        if (!bot || bot.status !== AppStatus.PUBLISHED)
            return new Result({ data: [] });

        const tagIds = bot.tags.map(tag => tag.id);
        if (tagIds.length === 0) return new Result({ data: [] });

        const relatedBots = await this.appRepository.getRepository().find({
            where: { tags: { id: In(tagIds) }, id: Not(query.id) },
            relations: ["tags", "ratings"],
            take: 5,
        });

        const res = relatedBots.map(bot => {
            const mappedBot = Mapper(GetRelatedBotResponse, bot);
            mappedBot.rateScore = this.getAverageRating(bot);
            return mappedBot;
        })

        return new Result({ data: res });
    }

    async searchBot(query: SearchBotRequest) {
        return paginate<App, SearchBotResponse>(
            () => this.appRepository.findMany(
                {
                    ...query,
                    relations: ["ratings"],
                    where: () => searchBuilder<App>({ keyword: query.search, fields: ["name", "headline"] })
                }),
            query.pageSize,
            query.pageNumber,
            (entity) => {
                const mappedBot = Mapper(SearchBotResponse, entity);
                mappedBot.rateScore = this.getAverageRating(entity);
                return mappedBot;
            },
        );
    }

    async filterBot(query: FilterBotRequest) {
        const whereCondition = filterBuilder(this.appRepository.getRepository().metadata, query.field, query.fieldId)

        return paginate<App, SearchBotResponse>(
            () => this.appRepository.findMany(
                {
                    ...query,
                    relations: ["ratings"],
                    where: () => whereCondition
                }),
            query.pageSize,
            query.pageNumber,
            (entity) => {
                const mappedBot = Mapper(SearchBotResponse, entity);
                mappedBot.rateScore = this.getAverageRating(entity);
                return mappedBot;
            },
        );
    }
}
