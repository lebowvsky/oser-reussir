import { Controller, Get, Put, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { HeroContent } from './hero.entity';
import { UpdateHeroDto } from './dto/update-hero.dto';

@ApiTags('hero')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperer le contenu de la section hero' })
  @ApiResponse({
    status: 200,
    description: 'Contenu hero retourne avec succes',
    type: HeroContent,
  })
  async getHero(): Promise<HeroContent> {
    return this.heroService.getHero();
  }

  // TODO: @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre a jour le contenu de la section hero' })
  @ApiResponse({
    status: 200,
    description: 'Contenu hero mis a jour avec succes',
    type: HeroContent,
  })
  @ApiResponse({ status: 400, description: 'Donnees invalides' })
  async updateHero(@Body() dto: UpdateHeroDto): Promise<HeroContent> {
    return this.heroService.updateHero(dto);
  }
}
