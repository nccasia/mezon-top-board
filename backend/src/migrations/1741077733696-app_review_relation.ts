import { MigrationInterface, QueryRunner } from "typeorm";

export class AppReviewRelation1741077733696 implements MigrationInterface {
    name = 'AppReviewRelation1741077733696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_review_history" DROP COLUMN "reviewer"`);
        await queryRunner.query(`ALTER TABLE "app_review_history" ADD "isApproved" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "app_review_history" ADD "reviewerId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "app_review_history" ADD CONSTRAINT "FK_86908d0ef2020e0490839544e72" FOREIGN KEY ("reviewerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_review_history" DROP CONSTRAINT "FK_86908d0ef2020e0490839544e72"`);
        await queryRunner.query(`ALTER TABLE "app_review_history" DROP COLUMN "reviewerId"`);
        await queryRunner.query(`ALTER TABLE "app_review_history" DROP COLUMN "isApproved"`);
        await queryRunner.query(`ALTER TABLE "app_review_history" ADD "reviewer" character varying NOT NULL`);
    }

}
