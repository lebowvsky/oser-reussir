import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePourquoiDto {
  @ApiProperty({
    description: 'Texte au-dessus du titre principal',
    example: 'Pourquoi Oser Réussir ?',
  })
  @IsString()
  @IsNotEmpty()
  eyebrow!: string;

  @ApiProperty({
    description: 'Titre principal de la section pourquoi',
    example: 'Parce que chaque jeune possède des ressources souvent insoupçonnées.',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Chapeau introductif',
    example: 'Parfois, il suffit d\'un espace d\'écoute...',
  })
  @IsString()
  @IsNotEmpty()
  lede!: string;

  @ApiProperty({
    description: 'Paragraphe de description',
    example: 'Le coaching scolaire propose une approche différente...',
  })
  @IsString()
  @IsNotEmpty()
  paragraph!: string;

  @ApiProperty({
    description: 'Titre de la carte bénéfices',
    example: 'Ce que le coaching apporte',
  })
  @IsString()
  @IsNotEmpty()
  cardTitle!: string;

  @ApiProperty({
    description: 'Premier bénéfice',
    example: 'Reprendre confiance en soi',
  })
  @IsString()
  @IsNotEmpty()
  benefice1!: string;

  @ApiProperty({
    description: 'Deuxième bénéfice',
    example: 'Retrouver la motivation',
  })
  @IsString()
  @IsNotEmpty()
  benefice2!: string;

  @ApiProperty({
    description: 'Troisième bénéfice',
    example: 'Mieux s\'organiser au quotidien',
  })
  @IsString()
  @IsNotEmpty()
  benefice3!: string;

  @ApiProperty({
    description: 'Quatrième bénéfice',
    example: 'Identifier des méthodes adaptées',
  })
  @IsString()
  @IsNotEmpty()
  benefice4!: string;

  @ApiProperty({
    description: 'Cinquième bénéfice',
    example: 'Dépasser les croyances limitantes',
  })
  @IsString()
  @IsNotEmpty()
  benefice5!: string;
}
