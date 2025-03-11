import { Request } from "express";

import { User } from "@domain/entities";

export class JwtPayload {
    email: string;
    iat: number;
    sessionToken: string;
    expireTime?: string | Date;
}

export type ValidateJwtRequest = Request & {
    user?: User;
    sessionToken?: string;
}