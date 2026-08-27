import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTarifDto {
  @ApiProperty({
    description: 'Titre du tarif',
    example: 'Séance de coaching individuel',
    maxLength: 120,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @ApiProperty({
    description: 'Montant du tarif, saisi en texte libre pour autoriser les formulations souples',
    example: '55 € / séance',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  price!: string;

  @ApiProperty({
    description: 'Description détaillée de la prestation',
    example: "Un accompagnement d'une heure pour travailler la confiance en soi et l'organisation.",
    maxLength: 400,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  description!: string;

  @ApiPropertyOptional({
    description: "Ordre d'affichage du tarif",
    example: 0,
  })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiPropertyOptional({
    description: 'Indique si le tarif est affiché sur le site public',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
