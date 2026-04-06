import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { AproposContent } from './apropos.entity';
import { UpdateAproposDto } from './dto/update-apropos.dto';

@Injectable()
export class AproposService {
  private readonly logger = new Logger(AproposService.name);
  private readonly uploadDir = path.join(
    process.cwd(),
    'uploads',
    'apropos',
  );

  constructor(
    @InjectRepository(AproposContent)
    private readonly aproposRepository: Repository<AproposContent>,
  ) {
    // Ensure the upload directory exists
    fs.mkdirSync(this.uploadDir, { recursive: true });
  }

  /**
   * Retourne le contenu a propos unique.
   * Si aucune ligne n'existe, en cree une avec les valeurs par defaut de l'entite.
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
   * Met a jour le contenu a propos avec les champs fournis dans le DTO.
   */
  async updateApropos(dto: UpdateAproposDto): Promise<AproposContent> {
    const apropos = await this.getApropos();

    Object.assign(apropos, dto);

    const saved = await this.aproposRepository.save(apropos);
    this.logger.log(`Contenu apropos mis a jour (id: ${saved.id})`);
    return saved;
  }

  /**
   * Enregistre l'image uploadee et met a jour le champ image_url.
   * Supprime l'ancienne image si elle existe.
   */
  async saveImage(file: { originalname: string; buffer: Buffer }): Promise<AproposContent> {
    const apropos = await this.getApropos();

    // Supprimer l'ancienne image si elle existe
    if (apropos.imageUrl) {
      this.deleteFileFromDisk(apropos.imageUrl);
    }

    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `apropos-${Date.now()}${ext}`;
    const filePath = path.join(this.uploadDir, filename);

    fs.writeFileSync(filePath, file.buffer);
    this.logger.log(`Image enregistree : ${filePath}`);

    apropos.imageUrl = `/uploads/apropos/${filename}`;
    const saved = await this.aproposRepository.save(apropos);
    this.logger.log(`Image URL mise a jour (id: ${saved.id})`);
    return saved;
  }

  /**
   * Supprime l'image courante et remet image_url a null.
   */
  async deleteImage(): Promise<AproposContent> {
    const apropos = await this.getApropos();

    if (!apropos.imageUrl) {
      throw new BadRequestException('Aucune image a supprimer');
    }

    this.deleteFileFromDisk(apropos.imageUrl);

    apropos.imageUrl = null;
    const saved = await this.aproposRepository.save(apropos);
    this.logger.log(`Image supprimee (id: ${saved.id})`);
    return saved;
  }

  /**
   * Supprime un fichier du disque a partir de son URL relative.
   */
  private deleteFileFromDisk(imageUrl: string): void {
    const filePath = path.join(process.cwd(), imageUrl);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        this.logger.log(`Fichier supprime du disque : ${filePath}`);
      }
    } catch (error) {
      this.logger.warn(
        `Impossible de supprimer le fichier ${filePath}: ${(error as Error).message}`,
      );
    }
  }
}
