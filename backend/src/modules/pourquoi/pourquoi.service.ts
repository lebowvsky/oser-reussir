import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PourquoiContent } from './pourquoi-content.entity';
import { UpdatePourquoiDto } from './dto/update-pourquoi.dto';

@Injectable()
export class PourquoiService {
  private readonly logger = new Logger(PourquoiService.name);

  constructor(
    @InjectRepository(PourquoiContent)
    private readonly pourquoiRepository: Repository<PourquoiContent>,
  ) {}

  /**
   * Retourne le contenu pourquoi unique.
   * Si aucune ligne n'existe, en cree une avec les valeurs par defaut de l'entite.
   */
  async getPourquoi(): Promise<PourquoiContent> {
    const existing = await this.pourquoiRepository.findOne({ where: {} });

    if (existing) {
      return existing;
    }

    this.logger.log(
      'Aucun contenu pourquoi existant, creation avec les valeurs par defaut',
    );
    const pourquoi = this.pourquoiRepository.create();
    return this.pourquoiRepository.save(pourquoi);
  }

  /**
   * Met a jour le contenu pourquoi avec les champs fournis dans le DTO.
   */
  async updatePourquoi(dto: UpdatePourquoiDto): Promise<PourquoiContent> {
    const pourquoi = await this.getPourquoi();

    Object.assign(pourquoi, dto);

    const saved = await this.pourquoiRepository.save(pourquoi);
    this.logger.log(`Contenu pourquoi mis a jour (id: ${saved.id})`);
    return saved;
  }
}
