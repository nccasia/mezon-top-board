import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1739434272836 implements MigrationInterface {
    name = 'InitDb1739434272836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_f603fc24759b12726df73c1ad46" UNIQUE ("name"), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."app_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "app" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "status" "public"."app_status_enum" NOT NULL DEFAULT '0', "isAutoPublished" boolean NOT NULL DEFAULT false, "installLink" character varying, "headline" character varying, "description" character varying, "prefix" character varying, "featuredImage" character varying, "ownerId" character varying NOT NULL, "supportUrl" character varying, "remark" character varying, CONSTRAINT "UQ_f36adbb7b096ceeb6f3e80ad14c" UNIQUE ("name"), CONSTRAINT "PK_9478629fc093d229df09e560aea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_review_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "appId" uuid NOT NULL, "reviewer" character varying NOT NULL, "reviewedAt" TIMESTAMP NOT NULL, "remark" character varying NOT NULL, CONSTRAINT "PK_ff9f0951d9b39ef7b9ee408d3a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "url" character varying NOT NULL, "linkTypeId" character varying NOT NULL, "typeId" uuid, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "link_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_24d980df1508b0877217e3781e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "appId" uuid NOT NULL, "userId" uuid NOT NULL, "score" integer NOT NULL, "comment" character varying, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "bio" character varying, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6620cd026ee2b231beac7cfe57" ON "user" ("role") `);
        await queryRunner.query(`CREATE TABLE "app_tags_tag" ("appId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_f81f81878b47d7c61860ba131f4" PRIMARY KEY ("appId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_42bef85ef6e9d912c70d52a1b5" ON "app_tags_tag" ("appId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a503480e477add36ec17a998fb" ON "app_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE TABLE "app_social_links_link" ("appId" uuid NOT NULL, "linkId" uuid NOT NULL, CONSTRAINT "PK_eba16c5eba17a0656abc67fa045" PRIMARY KEY ("appId", "linkId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78b1533efe3e410bdba92338ae" ON "app_social_links_link" ("appId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13a070ceb31e0090575bcc8e3b" ON "app_social_links_link" ("linkId") `);
        await queryRunner.query(`CREATE TABLE "user_social_links_link" ("userId" uuid NOT NULL, "linkId" uuid NOT NULL, CONSTRAINT "PK_2f754354d2190ee855e28ff0987" PRIMARY KEY ("userId", "linkId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4a63de6a0e8c02aeec6df8177e" ON "user_social_links_link" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d5bc2e7ed27033829e670697f0" ON "user_social_links_link" ("linkId") `);
        await queryRunner.query(`ALTER TABLE "app_review_history" ADD CONSTRAINT "FK_6c992f9f374bd14d7183ec7e88f" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "FK_3477700337f49b197eb0b53be6d" FOREIGN KEY ("typeId") REFERENCES "link_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_be3ee4cd00578404cac2e435024" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_tags_tag" ADD CONSTRAINT "FK_42bef85ef6e9d912c70d52a1b5e" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_tags_tag" ADD CONSTRAINT "FK_a503480e477add36ec17a998fbc" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app_social_links_link" ADD CONSTRAINT "FK_78b1533efe3e410bdba92338aef" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "app_social_links_link" ADD CONSTRAINT "FK_13a070ceb31e0090575bcc8e3b1" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_social_links_link" ADD CONSTRAINT "FK_4a63de6a0e8c02aeec6df8177e7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_social_links_link" ADD CONSTRAINT "FK_d5bc2e7ed27033829e670697f08" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_social_links_link" DROP CONSTRAINT "FK_d5bc2e7ed27033829e670697f08"`);
        await queryRunner.query(`ALTER TABLE "user_social_links_link" DROP CONSTRAINT "FK_4a63de6a0e8c02aeec6df8177e7"`);
        await queryRunner.query(`ALTER TABLE "app_social_links_link" DROP CONSTRAINT "FK_13a070ceb31e0090575bcc8e3b1"`);
        await queryRunner.query(`ALTER TABLE "app_social_links_link" DROP CONSTRAINT "FK_78b1533efe3e410bdba92338aef"`);
        await queryRunner.query(`ALTER TABLE "app_tags_tag" DROP CONSTRAINT "FK_a503480e477add36ec17a998fbc"`);
        await queryRunner.query(`ALTER TABLE "app_tags_tag" DROP CONSTRAINT "FK_42bef85ef6e9d912c70d52a1b5e"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_be3ee4cd00578404cac2e435024"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "FK_3477700337f49b197eb0b53be6d"`);
        await queryRunner.query(`ALTER TABLE "app_review_history" DROP CONSTRAINT "FK_6c992f9f374bd14d7183ec7e88f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5bc2e7ed27033829e670697f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a63de6a0e8c02aeec6df8177e"`);
        await queryRunner.query(`DROP TABLE "user_social_links_link"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13a070ceb31e0090575bcc8e3b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78b1533efe3e410bdba92338ae"`);
        await queryRunner.query(`DROP TABLE "app_social_links_link"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a503480e477add36ec17a998fb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42bef85ef6e9d912c70d52a1b5"`);
        await queryRunner.query(`DROP TABLE "app_tags_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6620cd026ee2b231beac7cfe57"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "link_type"`);
        await queryRunner.query(`DROP TABLE "link"`);
        await queryRunner.query(`DROP TABLE "app_review_history"`);
        await queryRunner.query(`DROP TABLE "app"`);
        await queryRunner.query(`DROP TYPE "public"."app_status_enum"`);
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
