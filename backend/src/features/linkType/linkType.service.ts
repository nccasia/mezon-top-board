import { Injectable } from "@nestjs/common";

import { EntityManager } from "typeorm";

import { Result } from "@domain/common/dtos/result.dto";
import { LinkType } from "@domain/entities";

import { GenericRepository } from "@libs/repository/genericRepository";
import { Mapper } from "@libs/utils/mapper";

import { SocialLinkWithNameResponse } from "./dtos/response";

@Injectable()
export class LinkTypeService {
  private readonly linkTypeRepository: GenericRepository<LinkType>;

  constructor(private manager: EntityManager) {
    this.linkTypeRepository = new GenericRepository(LinkType, manager);
  }

  async getAllSocialLinks() {
    const socialLinks = await this.linkTypeRepository.getRepository().find();

    return new Result({
      data: Mapper(SocialLinkWithNameResponse, socialLinks),
    });
  }
}
