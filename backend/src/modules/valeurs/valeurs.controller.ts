import { Controller, Get, Put, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ValeursService } from './valeurs.service';
import { ValeursContent } from './valeurs-content.entity';
import { UpdateValeursDto } from './dto/update-valeurs.dto';

@ApiTags('valeurs')
@Controller('valeurs')
export class ValeursController {
  constructor(private readonly valeursService: ValeursService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer le contenu de la section valeurs' })
  @ApiResponse({
    status: 200,
    description: 'Contenu valeurs retourne avec succes',
    type: ValeursContent,
  })
  async getValeurs(): Promise<ValeursContent> {
    return this.valeursService.getValeurs();
  }

  // TODO: @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour le contenu de la section valeurs' })
  @ApiResponse({
    status: 200,
    description: 'Contenu valeurs mis a jour avec succes',
    type: ValeursContent,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  async updateValeurs(@Body() dto: UpdateValeursDto): Promise<ValeursContent> {
    return this.valeursService.updateValeurs(dto);
  }
}
