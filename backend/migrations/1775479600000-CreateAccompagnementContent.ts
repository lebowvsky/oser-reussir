import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccompagnementContent1775479600000 implements MigrationInterface {
    name = 'CreateAccompagnementContent1775479600000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "accompagnement_content" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "eyebrow" character varying(255) NOT NULL DEFAULT 'Déroulé',
                "title" text NOT NULL DEFAULT 'Comment se déroule l''accompagnement ?',
                "lede" text NOT NULL DEFAULT 'Un parcours simple, respectueux du rythme du jeune et construit avec lui, étape après étape.',
                "step1_title" character varying(255) NOT NULL DEFAULT 'Première séance bilan offerte',
                "step1_text" text NOT NULL DEFAULT 'Un temps d''échange gratuit pour faire connaissance, comprendre la situation du jeune, ses besoins, et poser ensemble les premières bases.',
                "step1_highlight" boolean NOT NULL DEFAULT true,
                "step2_title" character varying(255) NOT NULL DEFAULT 'Accompagnement individualisé',
                "step2_text" text NOT NULL DEFAULT 'Pas de forfait imposé : la durée et le rythme s''adaptent à l''avancement, aux objectifs et aux besoins spécifiques de chaque jeune.',
                "step2_highlight" boolean NOT NULL DEFAULT false,
                "step3_title" character varying(255) NOT NULL DEFAULT 'L''accord du jeune',
                "step3_text" text NOT NULL DEFAULT 'L''engagement du jeune est indispensable. C''est sa démarche : il doit y adhérer pleinement pour que l''accompagnement porte ses fruits.',
                "step3_highlight" boolean NOT NULL DEFAULT false,
                "cta_title" character varying(255) NOT NULL DEFAULT 'Première séance offerte',
                "cta_text" text NOT NULL DEFAULT 'Pour découvrir l''accompagnement sans engagement, réservez votre séance bilan gratuite.',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_accompagnement_content_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "accompagnement_content"`);
    }

}
