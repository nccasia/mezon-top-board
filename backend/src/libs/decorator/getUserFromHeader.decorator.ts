import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { User } from '@domain/entities/schema/user.entity';

import { ErrorMessages } from '@libs/constant/errorMsg';

export const GetUserFromHeader = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): User => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user as User; // User entity from JwtStrategy
        if (!user)
            throw new UnauthorizedException(ErrorMessages.INVALID_USER);
        return user;
    },
);