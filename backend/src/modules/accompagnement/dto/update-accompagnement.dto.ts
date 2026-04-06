import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccompagnementDto {
  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Déroulé',
  })
  @IsString()
  @IsNotEmpty()
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section accompagnement',
    example: 'Comment se déroule l\'accompagnement ?',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Texte introductif sous le titre',
    example:
      'Un parcours simple, respectueux du rythme du jeune et construit avec lui, étape après étape.',
  })
  @IsString()
  @IsNotEmpty()
  lede!: string;

  @ApiProperty({
    description: 'Titre de la premiere etape',
    example: 'Première séance bilan offerte',
  })
  @IsString()
  @IsNotEmpty()
  step1Title!: string;

  @ApiProperty({
    description: 'Texte de la premiere etape',
    example:
      'Un temps d\'échange gratuit pour faire connaissance, comprendre la situation du jeune...',
  })
  @IsString()
  @IsNotEmpty()
  step1Text!: string;

  @ApiProperty({
    description: 'Mise en avant de la premiere etape',
    example: true,
  })
  @IsBoolean()
  step1Highlight!: boolean;

  @ApiProperty({
    description: 'Titre de la deuxieme etape',
    example: 'Accompagnement individualisé',
  })
  @IsString()
  @IsNotEmpty()
  step2Title!: string;

  @ApiProperty({
    description: 'Texte de la deuxieme etape',
    example:
      'Pas de forfait imposé : la durée et le rythme s\'adaptent à l\'avancement...',
  })
  @IsString()
  @IsNotEmpty()
  step2Text!: string;

  @ApiProperty({
    description: 'Mise en avant de la deuxieme etape',
    example: false,
  })
  @IsBoolean()
  step2Highlight!: boolean;

  @ApiProperty({
    description: 'Titre de la troisieme etape',
    example: "L'accord du jeune",
  })
  @IsString()
  @IsNotEmpty()
  step3Title!: string;

  @ApiProperty({
    description: 'Texte de la troisieme etape',
    example:
      'L\'engagement du jeune est indispensable. C\'est sa démarche...',
  })
  @IsString()
  @IsNotEmpty()
  step3Text!: string;

  @ApiProperty({
    description: 'Mise en avant de la troisieme etape',
    example: false,
  })
  @IsBoolean()
  step3Highlight!: boolean;

  @ApiProperty({
    description: 'Titre du call-to-action',
    example: 'Première séance offerte',
  })
  @IsString()
  @IsNotEmpty()
  ctaTitle!: string;

  @ApiProperty({
    description: 'Texte du call-to-action',
    example:
      'Pour découvrir l\'accompagnement sans engagement, réservez votre séance bilan gratuite.',
  })
  @IsString()
  @IsNotEmpty()
  ctaText!: string;
}
