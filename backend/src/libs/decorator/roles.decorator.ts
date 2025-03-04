import { Role } from '@domain/common/enum/role';
import { MetaKey } from '@libs/constant/meta-key.constant';
import { SetMetadata } from '@nestjs/common';

export const RoleRequired = (role: Role[]) => SetMetadata(MetaKey.ROLE, role);