import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('accompagnement_content')
export class AccompagnementContent {
  @ApiProperty({ description: 'Identifiant unique', example: 'a1b2c3d4-...' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Déroulé',
  })
  @Column({
    name: 'eyebrow',
    type: 'varchar',
    length: 255,
    default: 'Déroulé',
  })
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section accompagnement',
    example: 'Comment se déroule l\'accompagnement ?',
  })
  @Column({
    name: 'title',
    type: 'text',
    default: "Comment se déroule l'accompagnement ?",
  })
  title!: string;

  @ApiProperty({
    description: 'Texte introductif sous le titre',
    example:
      'Un parcours simple, respectueux du rythme du jeune et construit avec lui, étape après étape.',
  })
  @Column({
    name: 'lede',
    type: 'text',
    default:
      'Un parcours simple, respectueux du rythme du jeune et construit avec lui, étape après étape.',
  })
  lede!: string;

  @ApiProperty({
    description: 'Titre de la premiere etape',
    example: 'Première séance bilan offerte',
  })
  @Column({
    name: 'step1_title',
    type: 'varchar',
    length: 255,
    default: 'Première séance bilan offerte',
  })
  step1Title!: string;

  @ApiProperty({
    description: 'Texte de la premiere etape',
    example:
      'Un temps d\'échange gratuit pour faire connaissance, comprendre la situation du jeune...',
  })
  @Column({
    name: 'step1_text',
    type: 'text',
    default:
      'Un temps d\'échange gratuit pour faire connaissance, comprendre la situation du jeune, ses besoins, et poser ensemble les premières bases.',
  })
  step1Text!: string;

  @ApiProperty({
    description: 'Mise en avant de la premiere etape',
    example: true,
  })
  @Column({
    name: 'step1_highlight',
    type: 'boolean',
    default: true,
  })
  step1Highlight!: boolean;

  @ApiProperty({
    description: 'Titre de la deuxieme etape',
    example: 'Accompagnement individualisé',
  })
  @Column({
    name: 'step2_title',
    type: 'varchar',
    length: 255,
    default: 'Accompagnement individualisé',
  })
  step2Title!: string;

  @ApiProperty({
    description: 'Texte de la deuxieme etape',
    example:
      'Pas de forfait imposé : la durée et le rythme s\'adaptent à l\'avancement...',
  })
  @Column({
    name: 'step2_text',
    type: 'text',
    default:
      "Pas de forfait imposé : la durée et le rythme s'adaptent à l'avancement, aux objectifs et aux besoins spécifiques de chaque jeune.",
  })
  step2Text!: string;

  @ApiProperty({
    description: 'Mise en avant de la deuxieme etape',
    example: false,
  })
  @Column({
    name: 'step2_highlight',
    type: 'boolean',
    default: false,
  })
  step2Highlight!: boolean;

  @ApiProperty({
    description: 'Titre de la troisieme etape',
    example: "L'accord du jeune",
  })
  @Column({
    name: 'step3_title',
    type: 'varchar',
    length: 255,
    default: "L'accord du jeune",
  })
  step3Title!: string;

  @ApiProperty({
    description: 'Texte de la troisieme etape',
    example:
      'L\'engagement du jeune est indispensable. C\'est sa démarche...',
  })
  @Column({
    name: 'step3_text',
    type: 'text',
    default:
      "L'engagement du jeune est indispensable. C'est sa démarche : il doit y adhérer pleinement pour que l'accompagnement porte ses fruits.",
  })
  step3Text!: string;

  @ApiProperty({
    description: 'Mise en avant de la troisieme etape',
    example: false,
  })
  @Column({
    name: 'step3_highlight',
    type: 'boolean',
    default: false,
  })
  step3Highlight!: boolean;

  @ApiProperty({
    description: 'Titre du call-to-action',
    example: 'Première séance offerte',
  })
  @Column({
    name: 'cta_title',
    type: 'varchar',
    length: 255,
    default: 'Première séance offerte',
  })
  ctaTitle!: string;

  @ApiProperty({
    description: 'Texte du call-to-action',
    example:
      'Pour découvrir l\'accompagnement sans engagement, réservez votre séance bilan gratuite.',
  })
  @Column({
    name: 'cta_text',
    type: 'text',
    default:
      "Pour découvrir l'accompagnement sans engagement, réservez votre séance bilan gratuite.",
  })
  ctaText!: string;

  @ApiProperty({ description: 'Date de creation' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de derniere mise a jour' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
