import { MigrationInterface, QueryRunner } from "typeorm";

export class PayPro1700162322513 implements MigrationInterface {
    name = 'PayPro1700162322513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "amount" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "amount" integer NOT NULL`);
    }

}
