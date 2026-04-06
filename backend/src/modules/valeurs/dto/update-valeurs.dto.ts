import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateValeursDto {
  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Valeurs',
  })
  @IsString()
  @IsNotEmpty()
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section valeurs',
    example:
      'Quatre valeurs au coeur de chaque accompagnement.',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Titre de la premiere carte',
    example: 'Ecoute',
  })
  @IsString()
  @IsNotEmpty()
  card1Title!: string;

  @ApiProperty({
    description: 'Texte de la premiere carte',
    example:
      'Chaque jeune est accueilli avec son histoire, son rythme, ses emotions et ses propres mots.',
  })
  @IsString()
  @IsNotEmpty()
  card1Text!: string;

  @ApiProperty({
    description: 'Icone de la premiere carte',
    example: 'ear',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['ear', 'shield', 'wings', 'book'])
  card1Icon!: string;

  @ApiProperty({
    description: 'Titre de la deuxieme carte',
    example: 'Confiance',
  })
  @IsString()
  @IsNotEmpty()
  card2Title!: string;

  @ApiProperty({
    description: 'Texte de la deuxieme carte',
    example:
      'Retrouver confiance en ses capacites, en son jugement et en sa propre facon d\'apprendre.',
  })
  @IsString()
  @IsNotEmpty()
  card2Text!: string;

  @ApiProperty({
    description: 'Icone de la deuxieme carte',
    example: 'shield',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['ear', 'shield', 'wings', 'book'])
  card2Icon!: string;

  @ApiProperty({
    description: 'Titre de la troisieme carte',
    example: 'Autonomie',
  })
  @IsString()
  @IsNotEmpty()
  card3Title!: string;

  @ApiProperty({
    description: 'Texte de la troisieme carte',
    example:
      'Transmettre des outils durables, des reperes et des methodes que le jeune pourra mobiliser seul.',
  })
  @IsString()
  @IsNotEmpty()
  card3Text!: string;

  @ApiProperty({
    description: 'Icone de la troisieme carte',
    example: 'wings',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['ear', 'shield', 'wings', 'book'])
  card3Icon!: string;

  @ApiProperty({
    description: 'Titre de la quatrieme carte',
    example: 'Connaissance du systeme scolaire',
  })
  @IsString()
  @IsNotEmpty()
  card4Title!: string;

  @ApiProperty({
    description: 'Texte de la quatrieme carte',
    example:
      'Plus de vingt ans d\'experience d\'enseignante pour comprendre les realites concretes du parcours.',
  })
  @IsString()
  @IsNotEmpty()
  card4Text!: string;

  @ApiProperty({
    description: 'Icone de la quatrieme carte',
    example: 'book',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['ear', 'shield', 'wings', 'book'])
  card4Icon!: string;
}
