import { Injectable, NotFoundException } from "@nestjs/common";

import { EntityManager, In, Not } from "typeorm";

import { RequestWithId } from "@domain/common/dtos/request.dto";
import { Result } from "@domain/common/dtos/result.dto";
import { AppStatus } from "@domain/common/enum/appStatus";
import { App, Tag } from "@domain/entities";


import { NOT_FOUND_MSG } from "@libs/constant/errorMsg";
import { GenericRepository } from "@libs/repository/genericRepository";
import { Mapper } from "@libs/utils/mapper";
import { paginate } from "@libs/utils/paginate";

import { SearchBotRequest } from "./dtos/request";
import { GetBotDetailsResponse, GetRelatedBotResponse } from "./dtos/response";


@Injectable()
export class BotService {
    private readonly appRepository: GenericRepository<App>;
    private readonly tagRepository: GenericRepository<Tag>;
    constructor(private manager: EntityManager) {
        this.appRepository = new GenericRepository(App, manager);
        this.tagRepository = new GenericRepository(Tag, manager);
    }

    async getBotDetail(query: RequestWithId) {
        const bot = await this.appRepository.findById(query.id)
        if (!bot || bot.status !== AppStatus.PUBLISHED)
            throw new NotFoundException(NOT_FOUND_MSG)
        else return new Result({
            data: Mapper(GetBotDetailsResponse, bot),
        });
    }

    async getRelatedBot(query: RequestWithId) {
        const bot = await this.appRepository.getRepository().findOne({
            where: { id: query.id },
            relations: ["tags"], // Must load tags to get tag IDs
        });
        if (!bot || bot.status !== AppStatus.PUBLISHED)
            throw new NotFoundException(NOT_FOUND_MSG)
        else {
            console.log("bot", bot)
            const tagIds = bot.tags.map(tag => tag.id);
            if (tagIds.length === 0)
                return new Result({ data: [] })
            const relatedBots = await this.appRepository.getRepository().find({
                where: {
                    tags: { id: In(tagIds) },
                    id: Not(query.id),
                },
                relations: ["tags"],
                take: 5,
            });
            return new Result({ data: Mapper(GetRelatedBotResponse, relatedBots), })

        }
    }

    async searchBot(query: SearchBotRequest) {
        return paginate<App, GetBotDetailsResponse>(
            () =>
                this.appRepository.findMany(query),
            query.pageSize,
            query.pageNumber,
            (entity) => Mapper(GetBotDetailsResponse, entity),
        );
    }
}
