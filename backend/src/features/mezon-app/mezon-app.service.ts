import { Injectable, NotFoundException } from "@nestjs/common";

import { EntityManager, In, Not } from "typeorm";

import { RequestWithId } from "@domain/common/dtos/request.dto";
import { Result } from "@domain/common/dtos/result.dto";
import { AppStatus } from "@domain/common/enum/appStatus";
import { App, Link, Tag, User } from "@domain/entities";

import { INVALID_LINKS, INVALID_TAGS, NOT_FOUND_MSG } from "@libs/constant/errorMsg";
import { GenericRepository } from "@libs/repository/genericRepository";
import { Mapper } from "@libs/utils/mapper";
import { paginate } from "@libs/utils/paginate";
import { filterBuilder, searchBuilder } from "@libs/utils/queryBuilder";

import { CreateMezonAppRequest, SearchMezonAppRequest, UpdateMezonAppRequest } from "./dtos/request";
import { GetMezonAppDetailsResponse, GetRelatedMezonAppResponse, SearchMezonAppResponse } from "./dtos/response";

@Injectable()
export class MezonAppService {
    private readonly appRepository: GenericRepository<App>;
    private readonly userRepository: GenericRepository<User>;
    private readonly tagRepository: GenericRepository<Tag>;
    private readonly linkRepository: GenericRepository<Link>;

    constructor(private manager: EntityManager) {
        this.appRepository = new GenericRepository(App, manager);
        this.userRepository = new GenericRepository(User, manager);
        this.tagRepository = new GenericRepository(Tag, manager);
        this.linkRepository = new GenericRepository(Link, manager);
    }
    /**
    *  Calculate the average rating and round to the nearest 0.1 increment
    */
    private getAverageRating(mezonApp: App) {
        return mezonApp.ratings.length
            ? Math.round((mezonApp.ratings.reduce((sum, rating) => sum + rating.score, 0) / mezonApp.ratings.length) * 10) / 10
            : 0;
    }

    async getMezonAppDetail(query: RequestWithId) {
        const mezonApp = await this.appRepository.findById(query.id, ["tags", "socialLinks", "socialLinks.type", "ratings"])
        if (!mezonApp || mezonApp.status !== AppStatus.PUBLISHED)
            return new Result({ data: {} })
        else {
            const owner = await this.userRepository.findById(mezonApp.ownerId);

            const detail = Mapper(GetMezonAppDetailsResponse, mezonApp);

            detail.rateScore = this.getAverageRating(mezonApp)
            detail.owner = {
                id: owner.id,
                name: owner.name,
            }
            detail.tags = mezonApp.tags.map(tag => ({ id: tag.id, name: tag.name }))
            detail.socialLinks = mezonApp.socialLinks.map(link => ({ id: link.id, url: link.url, icon: link.type.icon ?? "" }))

            return new Result({
                data: detail,
            });
        }
    }

    async getRelatedMezonApp(query: RequestWithId) {
        const mezonApp = await this.appRepository.findById(query.id, ["tags"]);

        if (!mezonApp || mezonApp.status !== AppStatus.PUBLISHED)
            return new Result({ data: [] });

        const tagIds = mezonApp.tags.map(tag => tag.id);
        if (tagIds.length === 0) return new Result({ data: [] });

        const relatedMezonApps = await this.appRepository.getRepository().find({
            where: { tags: { id: In(tagIds) }, id: Not(query.id) },
            relations: ["tags", "ratings"],
            take: 5,
        });

        const res = relatedMezonApps.map(mezonApp => {
            const mappedMezonApp = Mapper(GetRelatedMezonAppResponse, mezonApp);
            mappedMezonApp.rateScore = this.getAverageRating(mezonApp);
            return mappedMezonApp;
        })

        return new Result({ data: res });
    }

    async searchMezonApp(query: SearchMezonAppRequest) {
        let whereCondition = undefined
        if (query.fieldId && query.field)
            whereCondition = filterBuilder(this.appRepository.getRepository().metadata, query.field, query.fieldId)

        // Priorize to search by keyword if field and search exist at the same time.
        if (query.search)
            whereCondition = searchBuilder<App>({ keyword: query.search, fields: ["name", "headline"] })

        return paginate<App, SearchMezonAppResponse>(
            () => this.appRepository.findMany(
                {
                    ...query,
                    relations: ["ratings"],
                    where: () => whereCondition
                }),
            query.pageSize,
            query.pageNumber,
            (entity) => {
                const mappedMezonApp = Mapper(SearchMezonAppResponse, entity);
                mappedMezonApp.rateScore = this.getAverageRating(entity);
                return mappedMezonApp;
            },
        );
    }
    async deleteMezonApp(req: RequestWithId) {
        await this.appRepository.softDelete(req.id)
        return new Result({})
    }

    async createMezonApp(req: CreateMezonAppRequest) {
        const { tagIds, socialLinkIds, ...appData } = req;

        // Fetch existing tags
        const existingTags = tagIds?.length ? await this.tagRepository.getRepository().findBy({ id: In(tagIds) }) : [];
        const missingTagIds = tagIds?.filter(id => !existingTags.some(tag => tag.id === id)) || [];
        if (missingTagIds.length)
            throw new NotFoundException(INVALID_TAGS);

        // Fetch existing social links
        const existingSocialLinks = socialLinkIds?.length ? await this.linkRepository.getRepository().findBy({ id: In(socialLinkIds) }) : [];
        const missingLinkIds = socialLinkIds?.filter(id => !existingSocialLinks.some(link => link.id === id)) || [];

        // If any IDs are missing, throw an error
        if (missingLinkIds.length) {
            throw new NotFoundException(INVALID_LINKS);
        }

        const newApp = await this.appRepository.create({
            ...appData,
            tags: existingTags,
            socialLinks: existingSocialLinks
        });

        return this.appRepository.getRepository().save(newApp);
    }

    async updateMezonApp(req: UpdateMezonAppRequest) {
        const app = await this.appRepository.findById(req.id, ["tags", "socialLinks"]);

        if (!app) {
            throw new NotFoundException(NOT_FOUND_MSG);
        }

        const { tagIds, socialLinkIds, ...updateData } = req;

        let tags = app.tags;
        let socialLinks = app.socialLinks;

        if (tagIds) {
            const existingTags = await this.tagRepository.getRepository().findBy({ id: In(tagIds) });
            const missingTagIds = tagIds.filter(id => !existingTags.some(tag => tag.id === id));

            if (missingTagIds.length) {
                throw new NotFoundException(INVALID_TAGS);
            }

            tags = existingTags;
        }

        if (socialLinkIds) {
            const existingSocialLinks = await this.linkRepository.getRepository().findBy({ id: In(socialLinkIds) });
            const missingLinkIds = socialLinkIds.filter(id => !existingSocialLinks.some(link => link.id === id));

            if (missingLinkIds.length) {
                throw new NotFoundException(INVALID_LINKS);
            }

            socialLinks = existingSocialLinks;
        }

        this.appRepository.getRepository().merge(app, { ...updateData, tags, socialLinks });

        return this.appRepository.getRepository().save(app);
    }
}
