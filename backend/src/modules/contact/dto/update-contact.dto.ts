import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto {
  @ApiProperty({
    description: 'Numero de telephone de contact',
    example: '06 12 34 56 78',
  })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({
    description: 'Adresse email de contact',
    example: 'contact@oser-reussir.fr',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
