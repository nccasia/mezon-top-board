import { User } from "@domain/entities";
import { Request } from "express";

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