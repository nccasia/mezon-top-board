import { SetMetadata } from '@nestjs/common';

import { Role } from '@domain/common/enum/role';

import { MetaKey } from '@libs/constant/meta-key.constant';

export const RoleRequired = (role: Role[]) => SetMetadata(MetaKey.ROLE, role);