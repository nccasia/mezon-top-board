import { GetPublicProfileResponse } from "@app/services/api/user/user";

export type CardInfoProps = {
    userInfo?: GetPublicProfileResponse;
    isPublic?: boolean;
};