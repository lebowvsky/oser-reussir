import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCredentialsDto {
  @ApiPropertyOptional({
    description: 'Nouvelle adresse email',
    example: 'admin@oser-reussir.fr',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Nouveau mot de passe (min. 8 caracteres)',
    example: 'nouveauMotDePasse',
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  newPassword?: string;

  @ApiProperty({
    description: 'Mot de passe actuel (requis pour toute modification)',
    example: 'motDePasseActuel',
  })
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;
}
