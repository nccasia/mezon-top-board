import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";

import { EntityManager } from "typeorm";

import { RequestWithId } from "@domain/common/dtos/request.dto";
import { Result } from "@domain/common/dtos/result.dto";
import { Role } from "@domain/common/enum/role";
import { User } from "@domain/entities";

import { ErrorMessages } from "@libs/constant/messages";
import { GenericRepository } from "@libs/repository/genericRepository";
import { Mapper } from "@libs/utils/mapper";
import { paginate } from "@libs/utils/paginate";
import { searchBuilder } from "@libs/utils/queryBuilder";

import { SearchUserRequest, SelfUpdateUserRequest, UpdateUserRequest } from "./dtos/request";
import { GetUserDetailsResponse, SearchUserResponse } from "./dtos/response";

@Injectable()
export class UserService {
    private readonly userRepository: GenericRepository<User>;
    constructor(private manager: EntityManager) {
        this.userRepository = new GenericRepository(User, manager);
    }

    async searchUser(query: SearchUserRequest) {
        let whereCondition = undefined

        if (query.search)
            whereCondition = searchBuilder<User>({ keyword: query.search, fields: ["name", "email"] })

        return paginate<User, SearchUserResponse>(
            () =>
                this.userRepository.findMany({
                    ...query,
                    where: () => whereCondition
                }),
            query.pageSize,
            query.pageNumber,
            (entity) => Mapper(SearchUserResponse, entity),
        );
    }

    async getUserDetails(userId: string) {
        const user = await this.userRepository.findById(userId)
        if (!user)
            throw new BadRequestException(ErrorMessages.NOT_FOUND_MSG)
        return new Result({ data: Mapper(GetUserDetailsResponse, user) })
    }

    async deleteUser(adminId: string, req: RequestWithId) {
        // Todo: move permission handler to decorator.
        const admin = await this.userRepository.findById(adminId);
        if (!admin || admin.role !== Role.ADMIN)
            throw new ForbiddenException(ErrorMessages.PERMISSION_DENIED)
        await this.userRepository.softDelete(req.id)
        return new Result()
    }

    async updateUser(adminId: string, req: UpdateUserRequest) {
        // Todo: move permission handler to decorator.
        const admin = await this.userRepository.findById(adminId);
        if (!admin || admin.role !== Role.ADMIN)
            throw new ForbiddenException(ErrorMessages.PERMISSION_DENIED)
        await this.userRepository.update(req.id, { name: req.name, bio: req.bio })
        return new Result()
    }

    async seflUpdateUser(userId: string, req: SelfUpdateUserRequest) {
        await this.userRepository.update(userId, { name: req.name, bio: req.bio })
        return new Result()
    }
}
