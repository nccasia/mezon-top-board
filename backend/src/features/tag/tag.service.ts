import { BadRequestException, Injectable } from "@nestjs/common";

import { EntityManager, ILike } from "typeorm";

import { RequestWithId } from "@domain/common/dtos/request.dto";
import { Result } from "@domain/common/dtos/result.dto";
import { Tag } from "@domain/entities";

import { ErrorMessages } from "@libs/constant/messages";
import { GenericRepository } from "@libs/repository/genericRepository";
import { Mapper } from "@libs/utils/mapper";

import { CreateTagRequest, UpdateTagRequest } from "./dtos/request";
import { TagResponse } from "./dtos/response";

@Injectable()
export class TagService {
  private readonly tagRepository: GenericRepository<Tag>;

  constructor(private manager: EntityManager) {
    this.tagRepository = new GenericRepository(Tag, manager);
  }

  async getTagAll() {
    const tags = await this.tagRepository.getRepository().find();

    return new Result({
      data: tags.map(tag => { return Mapper(TagResponse, tag) }),
    });
  }

  async createTag(body: CreateTagRequest) {
    const tag = await this.tagRepository.getRepository().findOne({ where: { name: ILike(body.name), slug: ILike(body.slug) } });
    if (tag)
      throw new BadRequestException(ErrorMessages.EXISTED_TAG)
    await this.tagRepository.create(body)
    return new Result()
  }

  async updateTag(body: UpdateTagRequest) {
    const tag = await this.tagRepository.getRepository().findOne({ where: { name: ILike(body.name), slug: ILike(body.slug) } });
    if (tag)
      throw new BadRequestException(ErrorMessages.EXISTED_TAG)

    await this.tagRepository.update(body.id, body)
    return new Result()
  }

  async deleteTag(body: RequestWithId) {
    await this.tagRepository.softDelete(body.id)
    return new Result()
  }
}
