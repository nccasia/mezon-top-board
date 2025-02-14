import { NotFoundException } from "@nestjs/common";

import {
    Repository,
    EntityTarget,
    EntityManager,
    ObjectLiteral,
    FindOptionsOrder,
    DeepPartial,
} from "typeorm";

import { SortOrder } from "@domain/common/enum/sortOder";

import { NOT_FOUND_MSG } from "@libs/constant/errorMsg";

export class GenericRepository<T extends ObjectLiteral> {
    private repository: Repository<T>;

    constructor(
        entity: EntityTarget<T>,
        private manager: EntityManager,
    ) {
        this.repository = this.manager.getRepository(entity);
    }

    public async findMany(req: {
        pageNumber: number;
        pageSize: number;
        sortField: string;
        sortOrder: string;
        filters?: object;
    }): Promise<[T[], number]> {
        const {
            pageNumber,
            pageSize,
            sortField = "createdAt",
            sortOrder = SortOrder.ASC,
            filters,
        } = req;

        return await this.repository.findAndCount({
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            where: filters,
            order: { [sortField]: sortOrder } as FindOptionsOrder<T>,
        });
    }

    public async findById(id: string): Promise<T | null> {
        return await this.repository.findOne({ where: { id } as any });
    }

    public async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }

    public async update(id: string, data: Partial<T>, msg: string = NOT_FOUND_MSG): Promise<void> {
        const entity = await this.findById(id);
        if (!entity)
            throw new NotFoundException(msg)
        await this.repository.update(id, data);
    }

    public async delete(id: string, msg: string = NOT_FOUND_MSG): Promise<void> {
        const entity = await this.findById(id);
        if (!entity)
            throw new NotFoundException(msg)
        await this.repository.delete(id);
    }

    public async softDelete(id: string, msg: string = NOT_FOUND_MSG): Promise<void> {
        const entity = await this.findById(id);
        if (!entity)
            throw new NotFoundException(msg)
        await this.repository.softDelete(id)
    }

    public getRepository(): Repository<T> {
        return this.repository; // Expose repository for custom queries
    }
}
