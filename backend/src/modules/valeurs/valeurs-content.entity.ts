import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('valeurs_content')
export class ValeursContent {
  @ApiProperty({ description: 'Identifiant unique', example: 'a1b2c3d4-...' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Valeurs',
  })
  @Column({
    name: 'eyebrow',
    type: 'varchar',
    length: 255,
    default: 'Valeurs',
  })
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section valeurs',
    example:
      'Quatre valeurs au coeur de chaque accompagnement.',
  })
  @Column({
    name: 'title',
    type: 'text',
    default:
      'Quatre valeurs au c\u0153ur de chaque accompagnement.',
  })
  title!: string;

  @ApiProperty({
    description: 'Titre de la premiere carte',
    example: 'Ecoute',
  })
  @Column({
    name: 'card1_title',
    type: 'varchar',
    length: 255,
    default: '\u00C9coute',
  })
  card1Title!: string;

  @ApiProperty({
    description: 'Texte de la premiere carte',
    example:
      'Chaque jeune est accueilli avec son histoire, son rythme, ses emotions et ses propres mots.',
  })
  @Column({
    name: 'card1_text',
    type: 'text',
    default:
      'Chaque jeune est accueilli avec son histoire, son rythme, ses \u00E9motions et ses propres mots.',
  })
  card1Text!: string;

  @ApiProperty({
    description: 'Icone de la premiere carte',
    example: 'ear',
  })
  @Column({
    name: 'card1_icon',
    type: 'varchar',
    length: 20,
    default: 'ear',
  })
  card1Icon!: string;

  @ApiProperty({
    description: 'Titre de la deuxieme carte',
    example: 'Confiance',
  })
  @Column({
    name: 'card2_title',
    type: 'varchar',
    length: 255,
    default: 'Confiance',
  })
  card2Title!: string;

  @ApiProperty({
    description: 'Texte de la deuxieme carte',
    example:
      'Retrouver confiance en ses capacites, en son jugement et en sa propre facon d\'apprendre.',
  })
  @Column({
    name: 'card2_text',
    type: 'text',
    default:
      "Retrouver confiance en ses capacit\u00E9s, en son jugement et en sa propre fa\u00E7on d'apprendre.",
  })
  card2Text!: string;

  @ApiProperty({
    description: 'Icone de la deuxieme carte',
    example: 'shield',
  })
  @Column({
    name: 'card2_icon',
    type: 'varchar',
    length: 20,
    default: 'shield',
  })
  card2Icon!: string;

  @ApiProperty({
    description: 'Titre de la troisieme carte',
    example: 'Autonomie',
  })
  @Column({
    name: 'card3_title',
    type: 'varchar',
    length: 255,
    default: 'Autonomie',
  })
  card3Title!: string;

  @ApiProperty({
    description: 'Texte de la troisieme carte',
    example:
      'Transmettre des outils durables, des reperes et des methodes que le jeune pourra mobiliser seul.',
  })
  @Column({
    name: 'card3_text',
    type: 'text',
    default:
      'Transmettre des outils durables, des rep\u00E8res et des m\u00E9thodes que le jeune pourra mobiliser seul.',
  })
  card3Text!: string;

  @ApiProperty({
    description: 'Icone de la troisieme carte',
    example: 'wings',
  })
  @Column({
    name: 'card3_icon',
    type: 'varchar',
    length: 20,
    default: 'wings',
  })
  card3Icon!: string;

  @ApiProperty({
    description: 'Titre de la quatrieme carte',
    example: 'Connaissance du systeme scolaire',
  })
  @Column({
    name: 'card4_title',
    type: 'varchar',
    length: 255,
    default: 'Connaissance du syst\u00E8me scolaire',
  })
  card4Title!: string;

  @ApiProperty({
    description: 'Texte de la quatrieme carte',
    example:
      'Plus de vingt ans d\'experience d\'enseignante pour comprendre les realites concretes du parcours.',
  })
  @Column({
    name: 'card4_text',
    type: 'text',
    default:
      "Plus de vingt ans d'exp\u00E9rience d'enseignante pour comprendre les r\u00E9alit\u00E9s concr\u00E8tes du parcours.",
  })
  card4Text!: string;

  @ApiProperty({
    description: 'Icone de la quatrieme carte',
    example: 'book',
  })
  @Column({
    name: 'card4_icon',
    type: 'varchar',
    length: 20,
    default: 'book',
  })
  card4Icon!: string;

  @ApiProperty({ description: 'Date de creation' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de derniere mise a jour' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
