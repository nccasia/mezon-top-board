import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddColumnProfileImage1742791175780 implements MigrationInterface {
    name = 'UserAddColumnProfileImage1742791175780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profileImage" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileImage"`);
    }

}
