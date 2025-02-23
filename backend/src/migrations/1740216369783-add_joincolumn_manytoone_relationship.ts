import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoincolumnManytooneRelationship1740216369783 implements MigrationInterface {
    name = 'AddJoincolumnManytooneRelationship1740216369783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "FK_3477700337f49b197eb0b53be6d"`);
        await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "typeId"`);
        await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "linkTypeId"`);
        await queryRunner.query(`ALTER TABLE "link" ADD "linkTypeId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "FK_83b0c28eb582f8146962edd9e60" FOREIGN KEY ("linkTypeId") REFERENCES "link_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "FK_83b0c28eb582f8146962edd9e60"`);
        await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "linkTypeId"`);
        await queryRunner.query(`ALTER TABLE "link" ADD "linkTypeId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link" ADD "typeId" uuid`);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "FK_3477700337f49b197eb0b53be6d" FOREIGN KEY ("typeId") REFERENCES "link_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
