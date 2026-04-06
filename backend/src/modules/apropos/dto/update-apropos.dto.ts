import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAproposDto {
  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'À propos',
  })
  @IsString()
  @IsNotEmpty()
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section à propos',
    example:
      'Accompagner autrement, au plus près de chaque jeune.',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Premier paragraphe de présentation',
    example:
      "Enseignante d'anglais depuis plus de vingt ans en lycée professionnel...",
  })
  @IsString()
  @IsNotEmpty()
  paragraph1!: string;

  @ApiProperty({
    description: 'Deuxième paragraphe de présentation',
    example:
      "Au fil des années, j'ai ressenti l'envie d'aller plus loin...",
  })
  @IsString()
  @IsNotEmpty()
  paragraph2!: string;

  @ApiProperty({
    description: 'Troisième paragraphe de présentation',
    example:
      'Mon objectif\u00a0: aider chaque jeune à reprendre confiance...',
  })
  @IsString()
  @IsNotEmpty()
  paragraph3!: string;

  @ApiProperty({
    description: 'Chiffre affiché dans le badge',
    example: '20+',
  })
  @IsString()
  @IsNotEmpty()
  badgeNumber!: string;

  @ApiProperty({
    description: 'Texte descriptif du badge',
    example: "années d'expérience",
  })
  @IsString()
  @IsNotEmpty()
  badgeLabel!: string;

  @ApiProperty({
    description: 'Premier point fort mis en avant',
    example: 'Enseignante en lycée professionnel',
  })
  @IsString()
  @IsNotEmpty()
  highlight1!: string;

  @ApiProperty({
    description: 'Deuxième point fort mis en avant',
    example: 'Formée au coaching scolaire',
  })
  @IsString()
  @IsNotEmpty()
  highlight2!: string;

  @ApiProperty({
    description: 'Troisième point fort mis en avant',
    example: 'Approche bienveillante et individualisée',
  })
  @IsString()
  @IsNotEmpty()
  highlight3!: string;

  @ApiPropertyOptional({
    description: "URL de l'image de la section à propos",
    example: '/uploads/apropos/photo.jpg',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
