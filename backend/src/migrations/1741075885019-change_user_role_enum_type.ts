import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserRoleEnumType1741075885019 implements MigrationInterface {
    name = 'ChangeUserRoleEnumType1741075885019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE VARCHAR`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`UPDATE "user" SET "role" = 'ADMIN' WHERE "role" = '0'`);
        await queryRunner.query(`UPDATE "user" SET "role" = 'DEVELOPER' WHERE "role" = '1'`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'DEVELOPER')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'DEVELOPER'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('0', '1', 'ADMIN', 'DEVELOPER')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE VARCHAR`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`UPDATE "user" SET "role" = '0' WHERE "role" = 'ADMIN'`);
        await queryRunner.query(`UPDATE "user" SET "role" = '1' WHERE "role" = 'DEVELOPER'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
    }

}
