import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";


import { Result } from "@domains/common/dtos/result.dto";
import { Media } from "@domains/entities/media.entity";


import { Mapper } from "@libs/utils/mapper";

import { GetUserResponse } from "./media.dto";

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async getAll() {
    const result = (await this.mediaRepository.find()).map((item) =>
      Mapper(GetUserResponse, item),
    );
    return new Result({
      data: result,
    });
  }
}
