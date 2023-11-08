import { MigrationInterface, QueryRunner } from "typeorm";

export class PayPro1699447204320 implements MigrationInterface {
    name = 'PayPro1699447204320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "photo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
    }

}
