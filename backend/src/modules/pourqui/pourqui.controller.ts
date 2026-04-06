import { Controller, Get, Put, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PourquiService } from './pourqui.service';
import { PourquiContent } from './pourqui-content.entity';
import { UpdatePourquiDto } from './dto/update-pourqui.dto';

@ApiTags('pourqui')
@Controller('pourqui')
export class PourquiController {
  constructor(private readonly pourquiService: PourquiService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer le contenu de la section pour qui' })
  @ApiResponse({
    status: 200,
    description: 'Contenu pour qui retourne avec succes',
    type: PourquiContent,
  })
  async getPourqui(): Promise<PourquiContent> {
    return this.pourquiService.getPourqui();
  }

  // TODO: @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour le contenu de la section pour qui' })
  @ApiResponse({
    status: 200,
    description: 'Contenu pour qui mis a jour avec succes',
    type: PourquiContent,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  async updatePourqui(@Body() dto: UpdatePourquiDto): Promise<PourquiContent> {
    return this.pourquiService.updatePourqui(dto);
  }
}
