import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TemoignagesService } from './temoignages.service';
import { Temoignage } from './temoignage.entity';
import { CreateTemoignageDto } from './dto/create-temoignage.dto';
import { UpdateTemoignageDto } from './dto/update-temoignage.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('temoignages')
@Controller('temoignages')
export class TemoignagesController {
  constructor(private readonly temoignagesService: TemoignagesService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer la liste des temoignages' })
  @ApiResponse({
    status: 200,
    description: 'Liste des temoignages retournee avec succes',
    type: [Temoignage],
  })
  async findAll(): Promise<Temoignage[]> {
    return this.temoignagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperer un temoignage par son identifiant' })
  @ApiResponse({
    status: 200,
    description: 'Temoignage retourne avec succes',
    type: Temoignage,
  })
  @ApiResponse({ status: 404, description: 'Temoignage introuvable' })
  async findOne(@Param('id') id: string): Promise<Temoignage> {
    return this.temoignagesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creer un nouveau temoignage' })
  @ApiResponse({
    status: 201,
    description: 'Temoignage cree avec succes',
    type: Temoignage,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  async create(@Body() dto: CreateTemoignageDto): Promise<Temoignage> {
    return this.temoignagesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour un temoignage' })
  @ApiResponse({
    status: 200,
    description: 'Temoignage mis a jour avec succes',
    type: Temoignage,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  @ApiResponse({ status: 404, description: 'Temoignage introuvable' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTemoignageDto,
  ): Promise<Temoignage> {
    return this.temoignagesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un temoignage' })
  @ApiResponse({ status: 204, description: 'Temoignage supprime avec succes' })
  @ApiResponse({ status: 404, description: 'Temoignage introuvable' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.temoignagesService.remove(id);
  }
}
