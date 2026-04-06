import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pourqui_content')
export class PourquiContent {
  @ApiProperty({ description: 'Identifiant unique', example: 'a1b2c3d4-...' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Pour qui ?',
  })
  @Column({
    name: 'eyebrow',
    type: 'varchar',
    length: 255,
    default: 'Pour qui ?',
  })
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section pour qui',
    example:
      'Un accompagnement pour les collegiens, lyceens et etudiants.',
  })
  @Column({
    name: 'title',
    type: 'text',
    default:
      'Un accompagnement pour les collégiens, lycéens et étudiants.',
  })
  title!: string;

  @ApiProperty({
    description: 'Texte introductif sous le titre',
    example:
      'Le coaching scolaire s\'adresse aux jeunes qui traversent un moment plus difficile...',
  })
  @Column({
    name: 'lede',
    type: 'text',
    default:
      "Le coaching scolaire s'adresse aux jeunes qui traversent un moment plus difficile, et qui ont besoin d'un espace dédié pour retrouver leur élan.",
  })
  lede!: string;

  @ApiProperty({
    description: 'Titre de la premiere carte',
    example: 'Manque de confiance',
  })
  @Column({
    name: 'card1_title',
    type: 'varchar',
    length: 255,
    default: 'Manque de confiance',
  })
  card1Title!: string;

  @ApiProperty({
    description: 'Texte de la premiere carte',
    example:
      'Quand la peur de se tromper ou le regard des autres prend le dessus...',
  })
  @Column({
    name: 'card1_text',
    type: 'text',
    default:
      "Quand la peur de se tromper ou le regard des autres prend le dessus sur l'envie d'avancer.",
  })
  card1Text!: string;

  @ApiProperty({
    description: 'Icone de la premiere carte',
    example: 'heart',
  })
  @Column({
    name: 'card1_icon',
    type: 'varchar',
    length: 20,
    default: 'heart',
  })
  card1Icon!: string;

  @ApiProperty({
    description: 'Titre de la deuxieme carte',
    example: 'Demotivation',
  })
  @Column({
    name: 'card2_title',
    type: 'varchar',
    length: 255,
    default: 'Démotivation',
  })
  card2Title!: string;

  @ApiProperty({
    description: 'Texte de la deuxieme carte',
    example:
      'Quand l\'ecole a perdu son sens et que la motivation s\'est eteinte...',
  })
  @Column({
    name: 'card2_text',
    type: 'text',
    default:
      "Quand l'école a perdu son sens et que la motivation s'est éteinte au fil du temps.",
  })
  card2Text!: string;

  @ApiProperty({
    description: 'Icone de la deuxieme carte',
    example: 'spark',
  })
  @Column({
    name: 'card2_icon',
    type: 'varchar',
    length: 20,
    default: 'spark',
  })
  card2Icon!: string;

  @ApiProperty({
    description: 'Titre de la troisieme carte',
    example: 'Difficultes d\'organisation',
  })
  @Column({
    name: 'card3_title',
    type: 'varchar',
    length: 255,
    default: "Difficultés d'organisation",
  })
  card3Title!: string;

  @ApiProperty({
    description: 'Texte de la troisieme carte',
    example:
      'Quand gerer son travail, ses revisions et son temps devient une source de stress.',
  })
  @Column({
    name: 'card3_text',
    type: 'text',
    default:
      'Quand gérer son travail, ses révisions et son temps devient une source de stress.',
  })
  card3Text!: string;

  @ApiProperty({
    description: 'Icone de la troisieme carte',
    example: 'grid',
  })
  @Column({
    name: 'card3_icon',
    type: 'varchar',
    length: 20,
    default: 'grid',
  })
  card3Icon!: string;

  @ApiProperty({
    description: 'Titre de la quatrieme carte',
    example: 'Doute sur ses capacites',
  })
  @Column({
    name: 'card4_title',
    type: 'varchar',
    length: 255,
    default: 'Doute sur ses capacités',
  })
  card4Title!: string;

  @ApiProperty({
    description: 'Texte de la quatrieme carte',
    example:
      'Quand le jeune se compare, se devalorise et n\'ose plus croire en ses propres ressources.',
  })
  @Column({
    name: 'card4_text',
    type: 'text',
    default:
      "Quand le jeune se compare, se dévalorise et n'ose plus croire en ses propres ressources.",
  })
  card4Text!: string;

  @ApiProperty({
    description: 'Icone de la quatrieme carte',
    example: 'question',
  })
  @Column({
    name: 'card4_icon',
    type: 'varchar',
    length: 20,
    default: 'question',
  })
  card4Icon!: string;

  @ApiProperty({
    description: 'Titre de la cinquieme carte',
    example: 'Perte de sens',
  })
  @Column({
    name: 'card5_title',
    type: 'varchar',
    length: 255,
    default: 'Perte de sens',
  })
  card5Title!: string;

  @ApiProperty({
    description: 'Texte de la cinquieme carte',
    example:
      'Quand l\'orientation ou les apprentissages semblent flous...',
  })
  @Column({
    name: 'card5_text',
    type: 'text',
    default:
      "Quand l'orientation ou les apprentissages semblent flous, et que l'on ne sait plus où aller.",
  })
  card5Text!: string;

  @ApiProperty({
    description: 'Icone de la cinquieme carte',
    example: 'compass',
  })
  @Column({
    name: 'card5_icon',
    type: 'varchar',
    length: 20,
    default: 'compass',
  })
  card5Icon!: string;

  @ApiProperty({
    description: 'Tag de la note informative',
    example: 'Important',
  })
  @Column({
    name: 'note_tag',
    type: 'varchar',
    length: 100,
    default: 'Important',
  })
  noteTag!: string;

  @ApiProperty({
    description: 'Message de la note informative',
    example:
      '<strong>Le coaching n\'est pas du soutien scolaire.</strong> Il ne remplace pas les cours particuliers...',
  })
  @Column({
    name: 'note_message',
    type: 'text',
    default:
      "<strong>Le coaching n'est pas du soutien scolaire.</strong> Il ne remplace pas les cours particuliers ni l'aide aux devoirs : il aide le jeune à mieux se connaître, à identifier ce qui bloque et à retrouver sa propre dynamique d'apprentissage.",
  })
  noteMessage!: string;

  @ApiProperty({ description: 'Date de creation' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de derniere mise a jour' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
