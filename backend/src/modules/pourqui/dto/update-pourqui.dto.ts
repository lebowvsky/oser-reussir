import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePourquiDto {
  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Pour qui ?',
  })
  @IsString()
  @IsNotEmpty()
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section pour qui',
    example:
      'Un accompagnement pour les collegiens, lyceens et etudiants.',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Texte introductif sous le titre',
    example:
      'Le coaching scolaire s\'adresse aux jeunes qui traversent un moment plus difficile...',
  })
  @IsString()
  @IsNotEmpty()
  lede!: string;

  @ApiProperty({
    description: 'Titre de la premiere carte',
    example: 'Manque de confiance',
  })
  @IsString()
  @IsNotEmpty()
  card1Title!: string;

  @ApiProperty({
    description: 'Texte de la premiere carte',
    example:
      'Quand la peur de se tromper ou le regard des autres prend le dessus...',
  })
  @IsString()
  @IsNotEmpty()
  card1Text!: string;

  @ApiProperty({
    description: 'Icone de la premiere carte',
    example: 'heart',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['heart', 'spark', 'grid', 'question', 'compass'])
  card1Icon!: string;

  @ApiProperty({
    description: 'Titre de la deuxieme carte',
    example: 'Demotivation',
  })
  @IsString()
  @IsNotEmpty()
  card2Title!: string;

  @ApiProperty({
    description: 'Texte de la deuxieme carte',
    example:
      'Quand l\'ecole a perdu son sens et que la motivation s\'est eteinte...',
  })
  @IsString()
  @IsNotEmpty()
  card2Text!: string;

  @ApiProperty({
    description: 'Icone de la deuxieme carte',
    example: 'spark',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['heart', 'spark', 'grid', 'question', 'compass'])
  card2Icon!: string;

  @ApiProperty({
    description: 'Titre de la troisieme carte',
    example: 'Difficultes d\'organisation',
  })
  @IsString()
  @IsNotEmpty()
  card3Title!: string;

  @ApiProperty({
    description: 'Texte de la troisieme carte',
    example:
      'Quand gerer son travail, ses revisions et son temps devient une source de stress.',
  })
  @IsString()
  @IsNotEmpty()
  card3Text!: string;

  @ApiProperty({
    description: 'Icone de la troisieme carte',
    example: 'grid',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['heart', 'spark', 'grid', 'question', 'compass'])
  card3Icon!: string;

  @ApiProperty({
    description: 'Titre de la quatrieme carte',
    example: 'Doute sur ses capacites',
  })
  @IsString()
  @IsNotEmpty()
  card4Title!: string;

  @ApiProperty({
    description: 'Texte de la quatrieme carte',
    example:
      'Quand le jeune se compare, se devalorise et n\'ose plus croire en ses propres ressources.',
  })
  @IsString()
  @IsNotEmpty()
  card4Text!: string;

  @ApiProperty({
    description: 'Icone de la quatrieme carte',
    example: 'question',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['heart', 'spark', 'grid', 'question', 'compass'])
  card4Icon!: string;

  @ApiProperty({
    description: 'Titre de la cinquieme carte',
    example: 'Perte de sens',
  })
  @IsString()
  @IsNotEmpty()
  card5Title!: string;

  @ApiProperty({
    description: 'Texte de la cinquieme carte',
    example:
      'Quand l\'orientation ou les apprentissages semblent flous...',
  })
  @IsString()
  @IsNotEmpty()
  card5Text!: string;

  @ApiProperty({
    description: 'Icone de la cinquieme carte',
    example: 'compass',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['heart', 'spark', 'grid', 'question', 'compass'])
  card5Icon!: string;

  @ApiProperty({
    description: 'Tag de la note informative',
    example: 'Important',
  })
  @IsString()
  @IsNotEmpty()
  noteTag!: string;

  @ApiProperty({
    description: 'Message de la note informative',
    example:
      '<strong>Le coaching n\'est pas du soutien scolaire.</strong> Il ne remplace pas les cours particuliers...',
  })
  @IsString()
  @IsNotEmpty()
  noteMessage!: string;
}
