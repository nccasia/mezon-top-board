import { ApiPropertyOptional, OmitType } from "@nestjs/swagger";

import { IsOptional, IsUUID } from "class-validator";

import { PaginationQuery, RequestWithId } from "@domain/common/dtos/request.dto";
import { Role } from "@domain/common/enum/role";

export class SearchUserRequest extends PaginationQuery {
    @ApiPropertyOptional({ description: "Keyword to search user by name or email" })
    @IsOptional()
    search: string;
}

export class GetPublicProfileInfoRequest {
  @ApiPropertyOptional({
    description: "userId",
  })
  @IsUUID()
  userId: string;
}

export class UpdateUserRequest extends RequestWithId {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;
  @ApiPropertyOptional()
  @IsOptional()
  bio: string;
  @ApiPropertyOptional()
  @IsOptional()
  role: Role;
  @ApiPropertyOptional()
  @IsOptional()
  profileImage: string;
}

export class SelfUpdateUserRequest extends OmitType(UpdateUserRequest, ["id", "role"]) { }