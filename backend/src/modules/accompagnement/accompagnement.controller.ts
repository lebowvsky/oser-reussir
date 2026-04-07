import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccompagnementService } from './accompagnement.service';
import { AccompagnementContent } from './accompagnement-content.entity';
import { UpdateAccompagnementDto } from './dto/update-accompagnement.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('accompagnement')
@Controller('accompagnement')
export class AccompagnementController {
  constructor(private readonly accompagnementService: AccompagnementService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer le contenu de la section accompagnement' })
  @ApiResponse({
    status: 200,
    description: 'Contenu accompagnement retourne avec succes',
    type: AccompagnementContent,
  })
  async getAccompagnement(): Promise<AccompagnementContent> {
    return this.accompagnementService.getAccompagnement();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour le contenu de la section accompagnement' })
  @ApiResponse({
    status: 200,
    description: 'Contenu accompagnement mis a jour avec succes',
    type: AccompagnementContent,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  async updateAccompagnement(@Body() dto: UpdateAccompagnementDto): Promise<AccompagnementContent> {
    return this.accompagnementService.updateAccompagnement(dto);
  }
}
