import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageUrlToAproposContent1775479500000 implements MigrationInterface {
    name = 'AddImageUrlToAproposContent1775479500000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "apropos_content"
            ADD COLUMN "image_url" character varying(500) DEFAULT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "apropos_content"
            DROP COLUMN "image_url"
        `);
    }

}
