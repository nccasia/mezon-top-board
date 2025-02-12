import * as dotenv from "dotenv";

const ENV = process.env.ENV;
export const envFilePath = `.env.${ENV ?? "local"}`;

dotenv.config({ path: envFilePath });

export default () => ({
  PORT: process.env.PORT || 8000,
  DB_NAME: process.env.DB_NAME || "",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_HOST: process.env.DB_HOST || "",
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_SCHEMA: process.env.DB_SCHEMA || "public",
});
