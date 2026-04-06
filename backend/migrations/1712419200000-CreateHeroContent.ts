import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHeroContent1712419200000 implements MigrationInterface {
  name = 'CreateHeroContent1712419200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      CREATE TABLE "hero_content" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "eyebrow" character varying(255) NOT NULL DEFAULT 'Coaching scolaire individuel',
        "title" text NOT NULL DEFAULT 'Retrouver confiance, **dépasser les blocages** et avancer dans son parcours scolaire.',
        "subtitle" text NOT NULL DEFAULT 'Enseignante et coach depuis plus de 20 ans, j''accompagne les jeunes avec bienveillance pour qu''ils reprennent confiance et trouvent leur propre chemin.',
        "primary_button_text" character varying(255) NOT NULL DEFAULT 'Prendre rendez-vous',
        "secondary_button_text" character varying(255) NOT NULL DEFAULT 'En savoir plus',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_hero_content" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "hero_content" ("eyebrow", "title", "subtitle", "primary_button_text", "secondary_button_text")
      VALUES (
        'Coaching scolaire individuel',
        'Retrouver confiance, **dépasser les blocages** et avancer dans son parcours scolaire.',
        'Enseignante et coach depuis plus de 20 ans, j''accompagne les jeunes avec bienveillance pour qu''ils reprennent confiance et trouvent leur propre chemin.',
        'Prendre rendez-vous',
        'En savoir plus'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "hero_content"`);
  }
}
