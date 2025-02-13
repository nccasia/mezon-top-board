import { BadRequestException, Injectable } from "@nestjs/common";

import { EntityManager } from "typeorm";

import { RequestWithId } from "@domain/common/dtos/request.dto";
import { Result } from "@domain/common/dtos/result.dto";
import { Media } from "@domain/entities";

import { GenericRepository } from "@libs/repository/genericRepository";
import { Mapper } from "@libs/utils/mapper";
import { paginate } from "@libs/utils/paginate";

import { CreateMediaRequest, DeleteMediaRequest, GetMediaRequest, UpdateMediaRequest } from "./dtos/request";
import { GetMediaResponse } from "./dtos/response";

@Injectable()
export class MediaService {
  private readonly mediaRepository: GenericRepository<Media>;
  constructor(private manager: EntityManager) {
    this.mediaRepository = new GenericRepository(Media, manager);
  }

  async getAll(query: GetMediaRequest) {
    return paginate<Media, GetMediaResponse>(
      () =>
        this.mediaRepository.findMany(query),
      query.pageSize,
      query.pageNumber,
      (entity) => Mapper(GetMediaResponse, entity),
    );
  }

  async getMedia(query: RequestWithId) {
    const media = await this.mediaRepository.findById(query.id)
    return new Result({ data: media })
  }

  async createMedia(req: CreateMediaRequest) {
    const { name } = req;
    const media = await this.mediaRepository.getRepository().findOneBy({ name });
    if (media)
      throw new BadRequestException("This name is already existed.");
    await this.mediaRepository.create({ name })

    return new Result({})
  }

  async deleteMedia(req: DeleteMediaRequest) {
    await this.mediaRepository.softDelete(req.id)
    return new Result({})
  }

  async update(req: UpdateMediaRequest) {
    await this.mediaRepository.update(req.id, { name: req.name })
    return new Result({})
  }
}
