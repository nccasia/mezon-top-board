import { MetaKey } from "@libs/constant/meta-key.constant";
import { SetMetadata } from "@nestjs/common";

export const Public = () => SetMetadata(MetaKey.SKIP_AUTH, true);
