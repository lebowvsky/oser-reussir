import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('temoignages')
export class Temoignage {
  @ApiProperty({ description: 'Identifiant unique', example: 'a1b2c3d4-...' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: "Nom de l'auteur du témoignage",
    example: 'Sophie D.',
  })
  @Column({
    name: 'author_name',
    type: 'varchar',
    length: 255,
  })
  authorName!: string;

  @ApiPropertyOptional({
    description: "Contexte de l'auteur du témoignage",
    example: 'Maman de Léa, 15 ans',
    nullable: true,
  })
  @Column({
    name: 'author_context',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  authorContext!: string | null;

  @ApiProperty({
    description: 'Contenu du témoignage',
    example:
      "Grâce à l'accompagnement, ma fille a retrouvé confiance en elle.",
  })
  @Column({
    name: 'content',
    type: 'text',
  })
  content!: string;

  @ApiProperty({
    description: "Ordre d'affichage du témoignage",
    example: 0,
    default: 0,
  })
  @Column({
    name: 'display_order',
    type: 'integer',
    default: 0,
  })
  displayOrder!: number;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de dernière mise à jour' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
