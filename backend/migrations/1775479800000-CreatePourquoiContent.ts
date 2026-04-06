import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePourquoiContent1775479800000 implements MigrationInterface {
    name = 'CreatePourquoiContent1775479800000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "pourquoi_content" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "eyebrow" character varying(255) NOT NULL DEFAULT 'Pourquoi Oser Réussir ?',
                "title" text NOT NULL DEFAULT 'Parce que chaque jeune possède des ressources souvent insoupçonnées.',
                "lede" text NOT NULL DEFAULT 'Parfois, il suffit d''un espace d''écoute, d''un accompagnement bienveillant et de quelques clés pour reprendre confiance et oser avancer.',
                "paragraph" text NOT NULL DEFAULT 'Le coaching scolaire propose une approche différente du soutien scolaire : il ne s''agit pas de refaire les cours, mais d''aider le jeune à mieux se connaître, à comprendre ce qui bloque et à retrouver une dynamique positive.',
                "card_title" character varying(255) NOT NULL DEFAULT 'Ce que le coaching apporte',
                "benefice1" character varying(255) NOT NULL DEFAULT 'Reprendre confiance en soi',
                "benefice2" character varying(255) NOT NULL DEFAULT 'Retrouver la motivation',
                "benefice3" character varying(255) NOT NULL DEFAULT 'Mieux s''organiser au quotidien',
                "benefice4" character varying(255) NOT NULL DEFAULT 'Identifier des méthodes adaptées',
                "benefice5" character varying(255) NOT NULL DEFAULT 'Dépasser les croyances limitantes',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_pourquoi_content_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pourquoi_content"`);
    }

}
