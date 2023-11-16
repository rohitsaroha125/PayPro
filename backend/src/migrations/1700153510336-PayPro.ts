import { MigrationInterface, QueryRunner } from "typeorm";

export class PayPro1700153510336 implements MigrationInterface {
    name = 'PayPro1700153510336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "senderId" integer NOT NULL, "receiverId" integer NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "senderIdId" integer, "receiverIdId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_3768270fc8b78a879ec04625ab8" FOREIGN KEY ("senderIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_47c99431005ce76c0a3bfc2d6fe" FOREIGN KEY ("receiverIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_47c99431005ce76c0a3bfc2d6fe"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_3768270fc8b78a879ec04625ab8"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
