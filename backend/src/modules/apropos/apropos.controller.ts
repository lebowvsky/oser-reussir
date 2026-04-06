import { Controller, Get, Put, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AproposService } from './apropos.service';
import { AproposContent } from './apropos.entity';
import { UpdateAproposDto } from './dto/update-apropos.dto';

@ApiTags('apropos')
@Controller('apropos')
export class AproposController {
  constructor(private readonly aproposService: AproposService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer le contenu de la section a propos' })
  @ApiResponse({
    status: 200,
    description: 'Contenu a propos retourne avec succes',
    type: AproposContent,
  })
  async getApropos(): Promise<AproposContent> {
    return this.aproposService.getApropos();
  }

  // TODO: @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour le contenu de la section a propos' })
  @ApiResponse({
    status: 200,
    description: 'Contenu a propos mis a jour avec succes',
    type: AproposContent,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  async updateApropos(@Body() dto: UpdateAproposDto): Promise<AproposContent> {
    return this.aproposService.updateApropos(dto);
  }
}
