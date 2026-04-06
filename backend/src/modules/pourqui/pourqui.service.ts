import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PourquiContent } from './pourqui-content.entity';
import { UpdatePourquiDto } from './dto/update-pourqui.dto';

@Injectable()
export class PourquiService {
  private readonly logger = new Logger(PourquiService.name);

  constructor(
    @InjectRepository(PourquiContent)
    private readonly pourquiRepository: Repository<PourquiContent>,
  ) {}

  /**
   * Retourne le contenu pour qui unique.
   * Si aucune ligne n'existe, en cree une avec les valeurs par defaut de l'entite.
   */
  async getPourqui(): Promise<PourquiContent> {
    const existing = await this.pourquiRepository.findOne({ where: {} });

    if (existing) {
      return existing;
    }

    this.logger.log(
      'Aucun contenu pourqui existant, creation avec les valeurs par defaut',
    );
    const pourqui = this.pourquiRepository.create();
    return this.pourquiRepository.save(pourqui);
  }

  /**
   * Met a jour le contenu pour qui avec les champs fournis dans le DTO.
   */
  async updatePourqui(dto: UpdatePourquiDto): Promise<PourquiContent> {
    const pourqui = await this.getPourqui();

    Object.assign(pourqui, dto);

    const saved = await this.pourquiRepository.save(pourqui);
    this.logger.log(`Contenu pourqui mis a jour (id: ${saved.id})`);
    return saved;
  }
}
