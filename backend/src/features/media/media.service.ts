import { BadRequestException, Injectable } from "@nestjs/common";

import { EntityManager } from "typeorm";

import { RequestWithId } from "@domain/common/dtos/request.dto";
import { Result } from "@domain/common/dtos/result.dto";
import { Media } from "@domain/entities";

import { GenericRepository } from "@libs/repository/genericRepository";
import { Mapper } from "@libs/utils/mapper";
import { paginate } from "@libs/utils/paginate";

import { uploadDir } from "@config/files.config";
import { createUploadPath } from "@libs/utils/file";
import { existsSync, unlinkSync } from "fs";
import { CreateMediaRequest, DeleteMediaRequest, GetMediaRequest } from "./dtos/request";
import { GetMediaResponse } from "./dtos/response";
import { ErrorMessages } from "@libs/constant/messages";
import envConfig from "@config/env.config";

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

  async createMedia(ownerId: string, req: CreateMediaRequest, file: Express.Multer.File) {
    const data = {
      fileName: file.filename,
      mimeType: file.mimetype,
      filePath: `/${createUploadPath(envConfig().UPLOAD_RELATIVE_DIR)}/${file.filename}`,
      ownerId,
    }

    const media = await this.mediaRepository.create(data)
    return new Result({ data: media })
  }

  async deleteMedia(req: DeleteMediaRequest) {
    // Remove file from disk
    const media = await this.mediaRepository.findById(req.id)
    if (!media) {
      throw new BadRequestException(ErrorMessages.NOT_FOUND_MSG)
    }

    const filePath = `${uploadDir}${media.filePath}`
    if (existsSync(filePath)) {
      unlinkSync(filePath)
    }
    await this.mediaRepository.delete(req.id)
    return new Result({})
  }
}
