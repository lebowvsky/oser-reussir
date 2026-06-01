import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTemoignageDto {
  @ApiProperty({
    description: "Nom de l'auteur du témoignage",
    example: 'Sophie D.',
  })
  @IsString()
  @IsNotEmpty()
  authorName!: string;

  @ApiPropertyOptional({
    description: "Contexte de l'auteur du témoignage",
    example: 'Maman de Léa, 15 ans',
  })
  @IsString()
  @IsOptional()
  authorContext?: string;

  @ApiProperty({
    description: 'Contenu du témoignage',
    example:
      "Grâce à l'accompagnement, ma fille a retrouvé confiance en elle.",
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({
    description: "Ordre d'affichage du témoignage",
    example: 0,
  })
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}
