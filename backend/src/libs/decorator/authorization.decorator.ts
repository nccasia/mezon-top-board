import { SetMetadata } from "@nestjs/common";

import { SKIP_AUTH } from "@libs/constant/meta-key.constant";

export const Public = () => SetMetadata(SKIP_AUTH, true);
