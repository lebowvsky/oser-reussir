import { Controller, Get, Put, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PourquoiService } from './pourquoi.service';
import { PourquoiContent } from './pourquoi-content.entity';
import { UpdatePourquoiDto } from './dto/update-pourquoi.dto';

@ApiTags('pourquoi')
@Controller('pourquoi')
export class PourquoiController {
  constructor(private readonly pourquoiService: PourquoiService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer le contenu de la section pourquoi' })
  @ApiResponse({
    status: 200,
    description: 'Contenu pourquoi retourne avec succes',
    type: PourquoiContent,
  })
  async getPourquoi(): Promise<PourquoiContent> {
    return this.pourquoiService.getPourquoi();
  }

  // TODO: @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour le contenu de la section pourquoi' })
  @ApiResponse({
    status: 200,
    description: 'Contenu pourquoi mis a jour avec succes',
    type: PourquoiContent,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  async updatePourquoi(@Body() dto: UpdatePourquoiDto): Promise<PourquoiContent> {
    return this.pourquoiService.updatePourquoi(dto);
  }
}
