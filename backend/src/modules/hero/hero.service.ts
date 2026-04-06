import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroContent } from './hero.entity';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  private readonly logger = new Logger(HeroService.name);

  constructor(
    @InjectRepository(HeroContent)
    private readonly heroRepository: Repository<HeroContent>,
  ) {}

  /**
   * Retourne le contenu hero unique.
   * Si aucune ligne n'existe, en cree une avec les valeurs par defaut de l'entite.
   */
  async getHero(): Promise<HeroContent> {
    const existing = await this.heroRepository.findOne({ where: {} });

    if (existing) {
      return existing;
    }

    this.logger.log(
      'Aucun contenu hero existant, creation avec les valeurs par defaut',
    );
    const hero = this.heroRepository.create();
    return this.heroRepository.save(hero);
  }

  /**
   * Met a jour le contenu hero avec les champs fournis dans le DTO.
   */
  async updateHero(dto: UpdateHeroDto): Promise<HeroContent> {
    const hero = await this.getHero();

    Object.assign(hero, dto);

    const saved = await this.heroRepository.save(hero);
    this.logger.log(`Contenu hero mis a jour (id: ${saved.id})`);
    return saved;
  }
}
