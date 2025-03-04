import { Injectable } from "@nestjs/common";

import { EntityManager } from "typeorm";

import { Result } from "@domain/common/dtos/result.dto";
import { LinkType } from "@domain/entities";

import { GenericRepository } from "@libs/repository/genericRepository";

@Injectable()
export class LinkTypeService {
  private readonly linkTypeRepository: GenericRepository<LinkType>;

  constructor(private manager: EntityManager) {
    this.linkTypeRepository = new GenericRepository(LinkType, manager);
  }

  async getAllSocialLinks() {
    const socialLinks = await this.linkTypeRepository.getRepository().find({
      select: ["id", "name", "icon"],
    });
    return new Result({
      data: socialLinks,
    });
  }
}
