import { Role } from '@domain/common/enum/role';
import { User } from '@domain/entities';
import { ErrorMessages } from '@libs/constant/messages';
import { MetaKey } from '@libs/constant/meta-key.constant';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<Role[]>(MetaKey.ROLE, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!roles?.length) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        if (this.hasRole(user, roles)) {
            return true;
        }

        throw new ForbiddenException(ErrorMessages.PERMISSION_DENIED);
    }

    private hasRole(user: User, roles: Role[]): boolean {
        if (!user || !user.role) {
            return false;
        }

        return roles.includes(user.role);
    }
}