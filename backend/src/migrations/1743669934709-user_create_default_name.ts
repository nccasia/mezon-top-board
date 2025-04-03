import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCreateDefaultName1743669934709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "user" SET name = SUBSTRING(email FROM 1 FOR POSITION('@' IN email) - 1) WHERE email IS NOT NULL AND name IS NULL`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
