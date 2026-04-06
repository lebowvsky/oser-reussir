import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateValeursContent1775479700000 implements MigrationInterface {
    name = 'CreateValeursContent1775479700000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "valeurs_content" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "eyebrow" character varying(255) NOT NULL DEFAULT 'Valeurs',
                "title" text NOT NULL DEFAULT 'Quatre valeurs au c\u0153ur de chaque accompagnement.',
                "card1_title" character varying(255) NOT NULL DEFAULT '\u00C9coute',
                "card1_text" text NOT NULL DEFAULT 'Chaque jeune est accueilli avec son histoire, son rythme, ses \u00E9motions et ses propres mots.',
                "card1_icon" character varying(20) NOT NULL DEFAULT 'ear',
                "card2_title" character varying(255) NOT NULL DEFAULT 'Confiance',
                "card2_text" text NOT NULL DEFAULT 'Retrouver confiance en ses capacit\u00E9s, en son jugement et en sa propre fa\u00E7on d''apprendre.',
                "card2_icon" character varying(20) NOT NULL DEFAULT 'shield',
                "card3_title" character varying(255) NOT NULL DEFAULT 'Autonomie',
                "card3_text" text NOT NULL DEFAULT 'Transmettre des outils durables, des rep\u00E8res et des m\u00E9thodes que le jeune pourra mobiliser seul.',
                "card3_icon" character varying(20) NOT NULL DEFAULT 'wings',
                "card4_title" character varying(255) NOT NULL DEFAULT 'Connaissance du syst\u00E8me scolaire',
                "card4_text" text NOT NULL DEFAULT 'Plus de vingt ans d''exp\u00E9rience d''enseignante pour comprendre les r\u00E9alit\u00E9s concr\u00E8tes du parcours.',
                "card4_icon" character varying(20) NOT NULL DEFAULT 'book',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_valeurs_content_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "valeurs_content"`);
    }

}
