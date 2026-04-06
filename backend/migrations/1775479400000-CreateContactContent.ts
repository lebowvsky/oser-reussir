import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContactContent1775479400000 implements MigrationInterface {
    name = 'CreateContactContent1775479400000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "contact_content" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "phone" character varying(30) NOT NULL DEFAULT '',
                "email" character varying(255) NOT NULL DEFAULT '',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_contact_content_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contact_content"`);
    }

}
