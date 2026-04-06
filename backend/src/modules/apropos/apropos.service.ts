import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AproposContent } from './apropos.entity';
import { UpdateAproposDto } from './dto/update-apropos.dto';

@Injectable()
export class AproposService {
  private readonly logger = new Logger(AproposService.name);

  constructor(
    @InjectRepository(AproposContent)
    private readonly aproposRepository: Repository<AproposContent>,
  ) {}

  /**
   * Retourne le contenu à propos unique.
   * Si aucune ligne n'existe, en crée une avec les valeurs par défaut de l'entité.
   */
  async getApropos(): Promise<AproposContent> {
    const existing = await this.aproposRepository.findOne({ where: {} });

    if (existing) {
      return existing;
    }

    this.logger.log(
      'Aucun contenu apropos existant, creation avec les valeurs par defaut',
    );
    const apropos = this.aproposRepository.create();
    return this.aproposRepository.save(apropos);
  }

  /**
   * Met à jour le contenu à propos avec les champs fournis dans le DTO.
   */
  async updateApropos(dto: UpdateAproposDto): Promise<AproposContent> {
    const apropos = await this.getApropos();

    Object.assign(apropos, dto);

    const saved = await this.aproposRepository.save(apropos);
    this.logger.log(`Contenu apropos mis a jour (id: ${saved.id})`);
    return saved;
  }
}
