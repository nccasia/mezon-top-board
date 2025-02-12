import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1739329711957 implements MigrationInterface {
  name = "Test1739329711957";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, CONSTRAINT "UQ_f603fc24759b12726df73c1ad46" UNIQUE ("name"), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "media"`);
  }
}
