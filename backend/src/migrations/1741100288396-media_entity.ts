import { MigrationInterface, QueryRunner } from "typeorm";

export class MediaEntity1741100288396 implements MigrationInterface {
    name = 'MediaEntity1741100288396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "UQ_f603fc24759b12726df73c1ad46"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "media" ADD "fileName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "media" ADD "mimeType" character varying`);
        await queryRunner.query(`ALTER TABLE "media" ADD "filePath" character varying`);
        await queryRunner.query(`ALTER TABLE "media" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_138d7762e76b7fee9de6db0f8eb" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_138d7762e76b7fee9de6db0f8eb"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "filePath"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "mimeType"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "fileName"`);
        await queryRunner.query(`ALTER TABLE "media" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "UQ_f603fc24759b12726df73c1ad46" UNIQUE ("name")`);
    }

}
