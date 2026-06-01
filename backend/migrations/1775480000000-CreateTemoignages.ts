import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTemoignages1775480000000 implements MigrationInterface {
    name = 'CreateTemoignages1775480000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temoignages" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "author_name" character varying(255) NOT NULL,
                "author_context" character varying(255),
                "content" text NOT NULL,
                "display_order" integer NOT NULL DEFAULT 0,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_temoignages" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "temoignages"`);
    }

}
