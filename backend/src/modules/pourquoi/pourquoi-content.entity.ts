import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pourquoi_content')
export class PourquoiContent {
  @ApiProperty({ description: 'Identifiant unique', example: 'a1b2c3d4-...' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Pourquoi Oser Réussir ?',
  })
  @Column({
    name: 'eyebrow',
    type: 'varchar',
    length: 255,
    default: 'Pourquoi Oser Réussir ?',
  })
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section pourquoi',
    example: 'Parce que chaque jeune possède des ressources souvent insoupçonnées.',
  })
  @Column({
    name: 'title',
    type: 'text',
    default:
      'Parce que chaque jeune possède des ressources souvent insoupçonnées.',
  })
  title!: string;

  @ApiProperty({
    description: 'Chapeau introductif',
    example: 'Parfois, il suffit d\'un espace d\'écoute...',
  })
  @Column({
    name: 'lede',
    type: 'text',
    default:
      "Parfois, il suffit d'un espace d'écoute, d'un accompagnement bienveillant et de quelques clés pour reprendre confiance et oser avancer.",
  })
  lede!: string;

  @ApiProperty({
    description: 'Paragraphe de description',
    example: 'Le coaching scolaire propose une approche différente...',
  })
  @Column({
    name: 'paragraph',
    type: 'text',
    default:
      "Le coaching scolaire propose une approche différente du soutien scolaire : il ne s'agit pas de refaire les cours, mais d'aider le jeune à mieux se connaître, à comprendre ce qui bloque et à retrouver une dynamique positive.",
  })
  paragraph!: string;

  @ApiProperty({
    description: 'Titre de la carte bénéfices',
    example: 'Ce que le coaching apporte',
  })
  @Column({
    name: 'card_title',
    type: 'varchar',
    length: 255,
    default: 'Ce que le coaching apporte',
  })
  cardTitle!: string;

  @ApiProperty({
    description: 'Premier bénéfice',
    example: 'Reprendre confiance en soi',
  })
  @Column({
    name: 'benefice1',
    type: 'varchar',
    length: 255,
    default: 'Reprendre confiance en soi',
  })
  benefice1!: string;

  @ApiProperty({
    description: 'Deuxième bénéfice',
    example: 'Retrouver la motivation',
  })
  @Column({
    name: 'benefice2',
    type: 'varchar',
    length: 255,
    default: 'Retrouver la motivation',
  })
  benefice2!: string;

  @ApiProperty({
    description: 'Troisième bénéfice',
    example: 'Mieux s\'organiser au quotidien',
  })
  @Column({
    name: 'benefice3',
    type: 'varchar',
    length: 255,
    default: "Mieux s'organiser au quotidien",
  })
  benefice3!: string;

  @ApiProperty({
    description: 'Quatrième bénéfice',
    example: 'Identifier des méthodes adaptées',
  })
  @Column({
    name: 'benefice4',
    type: 'varchar',
    length: 255,
    default: 'Identifier des méthodes adaptées',
  })
  benefice4!: string;

  @ApiProperty({
    description: 'Cinquième bénéfice',
    example: 'Dépasser les croyances limitantes',
  })
  @Column({
    name: 'benefice5',
    type: 'varchar',
    length: 255,
    default: 'Dépasser les croyances limitantes',
  })
  benefice5!: string;

  @ApiProperty({ description: 'Date de creation' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de derniere mise a jour' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
