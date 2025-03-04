import { Injectable } from "@nestjs/common";

import { EntityManager } from "typeorm";

import { Result } from "@domain/common/dtos/result.dto";
import { LinkType } from "@domain/entities";

import { GenericRepository } from "@libs/repository/genericRepository";

@Injectable()
export class LinkService {
  private readonly linkRepository: GenericRepository<LinkType>;

  constructor(private manager: EntityManager) {
    this.linkRepository = new GenericRepository(LinkType, manager);
  }

  async getAllSocialLinks() {
    const socialLinks = await this.linkRepository.getRepository().find({
      select: ["id", "name", "icon"],
    });
    return new Result({
      data: socialLinks,
    });
  }
}
