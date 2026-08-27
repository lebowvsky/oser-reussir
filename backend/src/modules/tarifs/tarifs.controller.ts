import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TarifsService } from './tarifs.service';
import { Tarif } from './tarif.entity';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('tarifs')
@Controller('tarifs')
export class TarifsController {
  constructor(private readonly tarifsService: TarifsService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer la liste des tarifs actifs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des tarifs actifs retournee avec succes',
    type: [Tarif],
  })
  async findAll(): Promise<Tarif[]> {
    return this.tarifsService.findAllActive();
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Recuperer la liste complete des tarifs, actifs et inactifs',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste complete des tarifs retournee avec succes',
    type: [Tarif],
  })
  async findAllForAdmin(): Promise<Tarif[]> {
    return this.tarifsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creer un nouveau tarif' })
  @ApiResponse({
    status: 201,
    description: 'Tarif cree avec succes',
    type: Tarif,
  })
  @ApiResponse({
    status: 400,
    description: 'Donnees invalides ou nombre maximum de tarifs atteint',
  })
  async create(@Body() dto: CreateTarifDto): Promise<Tarif> {
    return this.tarifsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour un tarif' })
  @ApiResponse({
    status: 200,
    description: 'Tarif mis a jour avec succes',
    type: Tarif,
  })
  @ApiResponse({
    status: 400,
    description: 'Donnees invalides ou identifiant de tarif invalide',
  })
  @ApiResponse({ status: 404, description: 'Tarif introuvable' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTarifDto,
  ): Promise<Tarif> {
    return this.tarifsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un tarif' })
  @ApiResponse({ status: 204, description: 'Tarif supprime avec succes' })
  @ApiResponse({ status: 400, description: 'Identifiant de tarif invalide' })
  @ApiResponse({ status: 404, description: 'Tarif introuvable' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tarifsService.remove(id);
  }
}
