import { Injectable } from "@nestjs/common";

import { EntityManager } from "typeorm";

import { Result } from "@domain/common/dtos/result.dto";
import { Tag } from "@domain/entities";

import { GenericRepository } from "@libs/repository/genericRepository";

@Injectable()
export class TagService {
  private readonly tagRepository: GenericRepository<Tag>;

  constructor(private manager: EntityManager) {
    this.tagRepository = new GenericRepository(Tag, manager);
  }

  async getTagAll() {
    const tag = await this.tagRepository.getRepository().find();
    const formattedTags = tag.map(({ id, name, slug }) => ({
      id,
      name,
      slug,
    }));
    return new Result({
      data: formattedTags,
    });
  }
}
