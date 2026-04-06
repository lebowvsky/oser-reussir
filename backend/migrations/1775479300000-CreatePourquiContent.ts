import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePourquiContent1775479300000 implements MigrationInterface {
    name = 'CreatePourquiContent1775479300000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "pourqui_content" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "eyebrow" character varying(255) NOT NULL DEFAULT 'Pour qui ?',
                "title" text NOT NULL DEFAULT 'Un accompagnement pour les collégiens, lycéens et étudiants.',
                "lede" text NOT NULL DEFAULT 'Le coaching scolaire s''adresse aux jeunes qui traversent un moment plus difficile, et qui ont besoin d''un espace dédié pour retrouver leur élan.',
                "card1_title" character varying(255) NOT NULL DEFAULT 'Manque de confiance',
                "card1_text" text NOT NULL DEFAULT 'Quand la peur de se tromper ou le regard des autres prend le dessus sur l''envie d''avancer.',
                "card1_icon" character varying(20) NOT NULL DEFAULT 'heart',
                "card2_title" character varying(255) NOT NULL DEFAULT 'Démotivation',
                "card2_text" text NOT NULL DEFAULT 'Quand l''école a perdu son sens et que la motivation s''est éteinte au fil du temps.',
                "card2_icon" character varying(20) NOT NULL DEFAULT 'spark',
                "card3_title" character varying(255) NOT NULL DEFAULT 'Difficultés d''organisation',
                "card3_text" text NOT NULL DEFAULT 'Quand gérer son travail, ses révisions et son temps devient une source de stress.',
                "card3_icon" character varying(20) NOT NULL DEFAULT 'grid',
                "card4_title" character varying(255) NOT NULL DEFAULT 'Doute sur ses capacités',
                "card4_text" text NOT NULL DEFAULT 'Quand le jeune se compare, se dévalorise et n''ose plus croire en ses propres ressources.',
                "card4_icon" character varying(20) NOT NULL DEFAULT 'question',
                "card5_title" character varying(255) NOT NULL DEFAULT 'Perte de sens',
                "card5_text" text NOT NULL DEFAULT 'Quand l''orientation ou les apprentissages semblent flous, et que l''on ne sait plus où aller.',
                "card5_icon" character varying(20) NOT NULL DEFAULT 'compass',
                "note_tag" character varying(100) NOT NULL DEFAULT 'Important',
                "note_message" text NOT NULL DEFAULT '<strong>Le coaching n''est pas du soutien scolaire.</strong> Il ne remplace pas les cours particuliers ni l''aide aux devoirs : il aide le jeune à mieux se connaître, à identifier ce qui bloque et à retrouver sa propre dynamique d''apprentissage.',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_pourqui_content_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pourqui_content"`);
    }

}
