import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tarifs')
export class Tarif {
  @ApiProperty({ description: 'Identifiant unique', example: 'a1b2c3d4-...' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Titre du tarif',
    example: 'Séance de coaching individuel',
  })
  @Column({
    name: 'title',
    type: 'varchar',
    length: 120,
  })
  title!: string;

  @ApiProperty({
    description: 'Montant du tarif, saisi en texte libre pour autoriser les formulations souples',
    example: '55 € / séance',
  })
  @Column({
    name: 'price',
    type: 'varchar',
    length: 50,
  })
  price!: string;

  @ApiProperty({
    description: 'Description détaillée de la prestation',
    example: "Un accompagnement d'une heure pour travailler la confiance en soi et l'organisation.",
  })
  @Column({
    name: 'description',
    type: 'text',
  })
  description!: string;

  @ApiProperty({
    description: "Ordre d'affichage du tarif",
    example: 0,
    default: 0,
  })
  @Column({
    name: 'display_order',
    type: 'integer',
    default: 0,
  })
  displayOrder!: number;

  @ApiProperty({
    description: 'Indique si le tarif est affiché sur le site public',
    example: true,
    default: true,
  })
  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de dernière mise à jour' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
