import { SKIP_AUTH } from "@libs/constant/meta-key.constant";
import { SetMetadata } from "@nestjs/common";

export const Public = () => SetMetadata(SKIP_AUTH, true);
