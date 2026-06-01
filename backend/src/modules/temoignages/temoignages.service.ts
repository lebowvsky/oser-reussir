import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temoignage } from './temoignage.entity';
import { CreateTemoignageDto } from './dto/create-temoignage.dto';
import { UpdateTemoignageDto } from './dto/update-temoignage.dto';

@Injectable()
export class TemoignagesService {
  private readonly logger = new Logger(TemoignagesService.name);

  constructor(
    @InjectRepository(Temoignage)
    private readonly temoignageRepository: Repository<Temoignage>,
  ) {}

  /**
   * Retourne la liste des témoignages, triés par ordre d'affichage puis par date de création.
   */
  async findAll(): Promise<Temoignage[]> {
    return this.temoignageRepository.find({
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  /**
   * Retourne un témoignage par son identifiant.
   * Lève une NotFoundException si le témoignage n'existe pas.
   */
  async findOne(id: string): Promise<Temoignage> {
    const temoignage = await this.temoignageRepository.findOne({
      where: { id },
    });

    if (!temoignage) {
      throw new NotFoundException(`Témoignage introuvable (id: ${id})`);
    }

    return temoignage;
  }

  /**
   * Crée un nouveau témoignage.
   */
  async create(dto: CreateTemoignageDto): Promise<Temoignage> {
    const temoignage = this.temoignageRepository.create(dto);
    const saved = await this.temoignageRepository.save(temoignage);
    this.logger.log(`Témoignage créé (id: ${saved.id})`);
    return saved;
  }

  /**
   * Met à jour un témoignage existant avec les champs fournis dans le DTO.
   */
  async update(id: string, dto: UpdateTemoignageDto): Promise<Temoignage> {
    const temoignage = await this.findOne(id);

    Object.assign(temoignage, dto);

    const saved = await this.temoignageRepository.save(temoignage);
    this.logger.log(`Témoignage mis à jour (id: ${saved.id})`);
    return saved;
  }

  /**
   * Supprime un témoignage existant.
   * Lève une NotFoundException si le témoignage n'existe pas.
   */
  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.temoignageRepository.delete(id);
    this.logger.log(`Témoignage supprimé (id: ${id})`);
  }
}
