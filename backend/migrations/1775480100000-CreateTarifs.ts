import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTarifs1775480100000 implements MigrationInterface {
    name = 'CreateTarifs1775480100000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tarifs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying(120) NOT NULL,
                "price" character varying(50) NOT NULL,
                "description" text NOT NULL,
                "display_order" integer NOT NULL DEFAULT 0,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_tarifs" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tarifs"`);
    }

}
