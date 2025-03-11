import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDefaultReviewedAt1740919174301 implements MigrationInterface {
    name = 'CreateDefaultReviewedAt1740919174301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_review_history" ALTER COLUMN "reviewedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_review_history" ALTER COLUMN "reviewedAt" DROP DEFAULT`);
    }

}
