import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contact_content')
export class ContactContent {
  @ApiProperty({ description: 'Identifiant unique', example: 'a1b2c3d4-...' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Numero de telephone de contact',
    example: '06 12 34 56 78',
  })
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 30,
    default: '',
  })
  phone!: string;

  @ApiProperty({
    description: 'Adresse email de contact',
    example: 'contact@oser-reussir.fr',
  })
  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    default: '',
  })
  email!: string;

  @ApiProperty({ description: 'Date de creation' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de derniere mise a jour' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
