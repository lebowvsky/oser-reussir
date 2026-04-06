import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAproposContent1775479227605 implements MigrationInterface {
    name = 'CreateAproposContent1775479227605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "apropos_content" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "eyebrow" character varying(255) NOT NULL DEFAULT 'À propos',
                "title" text NOT NULL DEFAULT 'Accompagner autrement, au plus près de chaque jeune.',
                "paragraph1" text NOT NULL DEFAULT 'Enseignante d''anglais depuis plus de vingt ans en lycée professionnel, j''ai accompagné des élèves aux profils très divers, avec leurs forces, leurs doutes et leurs histoires.',
                "paragraph2" text NOT NULL DEFAULT 'Au fil des années, j''ai ressenti l''envie d''aller plus loin que le cadre de la classe — d''offrir un espace dédié, centré sur le jeune, où écouter, comprendre et accompagner deviennent un vrai métier. C''est ainsi qu''est né <strong>Oser Réussir</strong>.',
                "paragraph3" text NOT NULL DEFAULT 'Mon objectif : aider chaque jeune à reprendre confiance, à mieux comprendre son fonctionnement, à dépasser ses blocages et à trouver des stratégies d''apprentissage qui lui correspondent vraiment.',
                "badge_number" character varying(50) NOT NULL DEFAULT '20+',
                "badge_label" character varying(255) NOT NULL DEFAULT 'années d''expérience',
                "highlight1" character varying(255) NOT NULL DEFAULT 'Enseignante en lycée professionnel',
                "highlight2" character varying(255) NOT NULL DEFAULT 'Formée au coaching scolaire',
                "highlight3" character varying(255) NOT NULL DEFAULT 'Approche bienveillante et individualisée',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_397e669908baead680321f2825e" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "apropos_content"`);
    }

}
