import { MigrationInterface, QueryRunner } from "typeorm";

export class PayPro1699967983417 implements MigrationInterface {
    name = 'PayPro1699967983417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "balance" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
    }

}
