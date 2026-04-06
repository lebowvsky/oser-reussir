import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccompagnementContent } from './accompagnement-content.entity';
import { UpdateAccompagnementDto } from './dto/update-accompagnement.dto';

@Injectable()
export class AccompagnementService {
  private readonly logger = new Logger(AccompagnementService.name);

  constructor(
    @InjectRepository(AccompagnementContent)
    private readonly accompagnementRepository: Repository<AccompagnementContent>,
  ) {}

  /**
   * Retourne le contenu accompagnement unique.
   * Si aucune ligne n'existe, en cree une avec les valeurs par defaut de l'entite.
   */
  async getAccompagnement(): Promise<AccompagnementContent> {
    const existing = await this.accompagnementRepository.findOne({ where: {} });

    if (existing) {
      return existing;
    }

    this.logger.log(
      'Aucun contenu accompagnement existant, creation avec les valeurs par defaut',
    );
    const accompagnement = this.accompagnementRepository.create();
    return this.accompagnementRepository.save(accompagnement);
  }

  /**
   * Met a jour le contenu accompagnement avec les champs fournis dans le DTO.
   */
  async updateAccompagnement(dto: UpdateAccompagnementDto): Promise<AccompagnementContent> {
    const accompagnement = await this.getAccompagnement();

    Object.assign(accompagnement, dto);

    const saved = await this.accompagnementRepository.save(accompagnement);
    this.logger.log(`Contenu accompagnement mis a jour (id: ${saved.id})`);
    return saved;
  }
}
