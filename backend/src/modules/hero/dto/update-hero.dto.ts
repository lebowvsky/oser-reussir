import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHeroDto {
  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Coaching scolaire individuel',
  })
  @IsString()
  @IsNotEmpty()
  eyebrow!: string;

  @ApiProperty({
    description:
      'Titre principal. Utiliser **...** pour le texte en couleur accent.',
    example:
      'Retrouver confiance, **dépasser les blocages** et avancer dans son parcours scolaire.',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Sous-titre descriptif',
    example:
      "Enseignante et coach depuis plus de 20 ans, j'accompagne les jeunes...",
  })
  @IsString()
  @IsNotEmpty()
  subtitle!: string;

  @ApiProperty({
    description: 'Texte du bouton principal (CTA)',
    example: 'Prendre rendez-vous',
  })
  @IsString()
  @IsNotEmpty()
  primaryButtonText!: string;

  @ApiProperty({
    description: 'Texte du bouton secondaire',
    example: 'En savoir plus',
  })
  @IsString()
  @IsNotEmpty()
  secondaryButtonText!: string;
}
