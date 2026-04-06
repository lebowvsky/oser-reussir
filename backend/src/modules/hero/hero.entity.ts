import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('hero_content')
export class HeroContent {
  @ApiProperty({ description: 'Identifiant unique', example: 'a1b2c3d4-...' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Coaching scolaire individuel',
  })
  @Column({
    name: 'eyebrow',
    type: 'varchar',
    length: 255,
    default: 'Coaching scolaire individuel',
  })
  eyebrow!: string;

  @ApiProperty({
    description:
      'Titre principal. Les marqueurs **...** indiquent le texte en couleur accent.',
    example:
      'Retrouver confiance, **dépasser les blocages** et avancer dans son parcours scolaire.',
  })
  @Column({
    name: 'title',
    type: 'text',
    default:
      "Retrouver confiance, **dépasser les blocages** et avancer dans son parcours scolaire.",
  })
  title!: string;

  @ApiProperty({
    description: 'Sous-titre descriptif',
    example:
      "Enseignante et coach depuis plus de 20 ans, j'accompagne les jeunes...",
  })
  @Column({
    name: 'subtitle',
    type: 'text',
    default:
      "Enseignante et coach depuis plus de 20 ans, j'accompagne les jeunes avec bienveillance pour qu'ils reprennent confiance et trouvent leur propre chemin.",
  })
  subtitle!: string;

  @ApiProperty({
    description: 'Texte du bouton principal (CTA)',
    example: 'Prendre rendez-vous',
  })
  @Column({
    name: 'primary_button_text',
    type: 'varchar',
    length: 255,
    default: 'Prendre rendez-vous',
  })
  primaryButtonText!: string;

  @ApiProperty({
    description: 'Texte du bouton secondaire',
    example: 'En savoir plus',
  })
  @Column({
    name: 'secondary_button_text',
    type: 'varchar',
    length: 255,
    default: 'En savoir plus',
  })
  secondaryButtonText!: string;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de dernière mise à jour' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
