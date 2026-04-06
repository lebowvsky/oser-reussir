import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('apropos_content')
export class AproposContent {
  @ApiProperty({ description: 'Identifiant unique', example: 'a1b2c3d4-...' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'À propos',
  })
  @Column({
    name: 'eyebrow',
    type: 'varchar',
    length: 255,
    default: 'À propos',
  })
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section à propos',
    example:
      'Accompagner autrement, au plus près de chaque jeune.',
  })
  @Column({
    name: 'title',
    type: 'text',
    default:
      'Accompagner autrement, au plus près de chaque jeune.',
  })
  title!: string;

  @ApiProperty({
    description: 'Premier paragraphe de présentation',
    example:
      "Enseignante d'anglais depuis plus de vingt ans en lycée professionnel...",
  })
  @Column({
    name: 'paragraph1',
    type: 'text',
    default:
      "Enseignante d'anglais depuis plus de vingt ans en lycée professionnel, j'ai accompagné des élèves aux profils très divers, avec leurs forces, leurs doutes et leurs histoires.",
  })
  paragraph1!: string;

  @ApiProperty({
    description: 'Deuxième paragraphe de présentation',
    example:
      "Au fil des années, j'ai ressenti l'envie d'aller plus loin...",
  })
  @Column({
    name: 'paragraph2',
    type: 'text',
    default:
      "Au fil des années, j'ai ressenti l'envie d'aller plus loin que le cadre de la classe — d'offrir un espace dédié, centré sur le jeune, où écouter, comprendre et accompagner deviennent un vrai métier. C'est ainsi qu'est né <strong>Oser Réussir</strong>.",
  })
  paragraph2!: string;

  @ApiProperty({
    description: 'Troisième paragraphe de présentation',
    example:
      'Mon objectif\u00a0: aider chaque jeune à reprendre confiance...',
  })
  @Column({
    name: 'paragraph3',
    type: 'text',
    default:
      "Mon objectif\u00a0: aider chaque jeune à reprendre confiance, à mieux comprendre son fonctionnement, à dépasser ses blocages et à trouver des stratégies d'apprentissage qui lui correspondent vraiment.",
  })
  paragraph3!: string;

  @ApiProperty({
    description: 'Chiffre affiché dans le badge',
    example: '20+',
  })
  @Column({
    name: 'badge_number',
    type: 'varchar',
    length: 50,
    default: '20+',
  })
  badgeNumber!: string;

  @ApiProperty({
    description: 'Texte descriptif du badge',
    example: "années d'expérience",
  })
  @Column({
    name: 'badge_label',
    type: 'varchar',
    length: 255,
    default: "années d'expérience",
  })
  badgeLabel!: string;

  @ApiProperty({
    description: 'Premier point fort mis en avant',
    example: 'Enseignante en lycée professionnel',
  })
  @Column({
    name: 'highlight1',
    type: 'varchar',
    length: 255,
    default: 'Enseignante en lycée professionnel',
  })
  highlight1!: string;

  @ApiProperty({
    description: 'Deuxième point fort mis en avant',
    example: 'Formée au coaching scolaire',
  })
  @Column({
    name: 'highlight2',
    type: 'varchar',
    length: 255,
    default: 'Formée au coaching scolaire',
  })
  highlight2!: string;

  @ApiProperty({
    description: 'Troisième point fort mis en avant',
    example: 'Approche bienveillante et individualisée',
  })
  @Column({
    name: 'highlight3',
    type: 'varchar',
    length: 255,
    default: 'Approche bienveillante et individualisée',
  })
  highlight3!: string;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de dernière mise à jour' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
