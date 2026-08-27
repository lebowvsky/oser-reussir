import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarif } from './tarif.entity';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';

/**
 * Nombre maximum de tarifs pouvant coexister en base.
 */
export const MAX_TARIFS = 5;

@Injectable()
export class TarifsService {
  private readonly logger = new Logger(TarifsService.name);

  constructor(
    @InjectRepository(Tarif)
    private readonly tarifRepository: Repository<Tarif>,
  ) {}

  /**
   * Retourne uniquement les tarifs actifs, triés par ordre d'affichage puis par date de création.
   * Utilisé par le site vitrine.
   */
  async findAllActive(): Promise<Tarif[]> {
    return this.tarifRepository.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  /**
   * Retourne l'ensemble des tarifs, actifs comme inactifs, triés par ordre d'affichage
   * puis par date de création. Utilisé par le backoffice.
   */
  async findAll(): Promise<Tarif[]> {
    return this.tarifRepository.find({
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  /**
   * Retourne un tarif par son identifiant.
   * Lève une NotFoundException si le tarif n'existe pas.
   */
  async findOne(id: string): Promise<Tarif> {
    const tarif = await this.tarifRepository.findOne({
      where: { id },
    });

    if (!tarif) {
      throw new NotFoundException(`Tarif introuvable (id: ${id})`);
    }

    return tarif;
  }

  /**
   * Crée un nouveau tarif.
   * Lève une BadRequestException si le nombre maximum de tarifs est déjà atteint.
   */
  async create(dto: CreateTarifDto): Promise<Tarif> {
    const count = await this.tarifRepository.count();

    if (count >= MAX_TARIFS) {
      throw new BadRequestException(`Nombre maximum de tarifs atteint (${MAX_TARIFS}).`);
    }

    const tarif = this.tarifRepository.create(dto);
    const saved = await this.tarifRepository.save(tarif);
    this.logger.log(`Tarif créé (id: ${saved.id})`);
    return saved;
  }

  /**
   * Met à jour un tarif existant avec les champs fournis dans le DTO.
   */
  async update(id: string, dto: UpdateTarifDto): Promise<Tarif> {
    const tarif = await this.findOne(id);

    Object.assign(tarif, dto);

    const saved = await this.tarifRepository.save(tarif);
    this.logger.log(`Tarif mis à jour (id: ${saved.id})`);
    return saved;
  }

  /**
   * Supprime un tarif existant.
   * Lève une NotFoundException si le tarif n'existe pas.
   */
  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.tarifRepository.delete(id);
    this.logger.log(`Tarif supprimé (id: ${id})`);
  }
}
