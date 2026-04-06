import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValeursContent } from './valeurs-content.entity';
import { UpdateValeursDto } from './dto/update-valeurs.dto';

@Injectable()
export class ValeursService {
  private readonly logger = new Logger(ValeursService.name);

  constructor(
    @InjectRepository(ValeursContent)
    private readonly valeursRepository: Repository<ValeursContent>,
  ) {}

  /**
   * Retourne le contenu valeurs unique.
   * Si aucune ligne n'existe, en cree une avec les valeurs par defaut de l'entite.
   */
  async getValeurs(): Promise<ValeursContent> {
    const existing = await this.valeursRepository.findOne({ where: {} });

    if (existing) {
      return existing;
    }

    this.logger.log(
      'Aucun contenu valeurs existant, creation avec les valeurs par defaut',
    );
    const valeurs = this.valeursRepository.create();
    return this.valeursRepository.save(valeurs);
  }

  /**
   * Met a jour le contenu valeurs avec les champs fournis dans le DTO.
   */
  async updateValeurs(dto: UpdateValeursDto): Promise<ValeursContent> {
    const valeurs = await this.getValeurs();

    Object.assign(valeurs, dto);

    const saved = await this.valeursRepository.save(valeurs);
    this.logger.log(`Contenu valeurs mis a jour (id: ${saved.id})`);
    return saved;
  }
}
