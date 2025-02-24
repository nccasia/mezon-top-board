import * as dotenv from "dotenv";

const ENV = process.env.ENV;
export const envFilePath = `.env.${ENV ?? "local"}`;

dotenv.config({ path: envFilePath });

export default () => ({
  PORT: process.env.PORT || 8000,
  DB_NAME: process.env.POSTGRES_DB || "",
  DB_PORT: process.env.POSTGRES_PORT || 5432,
  DB_HOST: process.env.POSTGRES_HOST || "",
  DB_USERNAME: process.env.POSTGRES_USERNAME || "",
  DB_PASSWORD: process.env.POSTGRES_PASSWORD || "",
  DB_SCHEMA: process.env.POSTGRES_SCHEMA || "public",
});
