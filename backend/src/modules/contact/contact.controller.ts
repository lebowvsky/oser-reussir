import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactContent } from './contact.entity';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer les informations de contact' })
  @ApiResponse({
    status: 200,
    description: 'Informations de contact retournees avec succes',
    type: ContactContent,
  })
  async getContact(): Promise<ContactContent> {
    return this.contactService.getContact();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour les informations de contact' })
  @ApiResponse({
    status: 200,
    description: 'Informations de contact mises a jour avec succes',
    type: ContactContent,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  async updateContact(@Body() dto: UpdateContactDto): Promise<ContactContent> {
    return this.contactService.updateContact(dto);
  }
}
