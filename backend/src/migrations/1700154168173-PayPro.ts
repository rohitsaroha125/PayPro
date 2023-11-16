import { MigrationInterface, QueryRunner } from "typeorm";

export class PayPro1700154168173 implements MigrationInterface {
    name = 'PayPro1700154168173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_ed3e32981d7a640be5480effec" ON "transaction" ("senderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7185cb5bc0826915be077f0d88" ON "transaction" ("receiverId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7185cb5bc0826915be077f0d88"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed3e32981d7a640be5480effec"`);
    }

}
