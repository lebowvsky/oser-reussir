import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactContent } from './contact.entity';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @InjectRepository(ContactContent)
    private readonly contactRepository: Repository<ContactContent>,
  ) {}

  /**
   * Retourne le contenu contact unique.
   * Si aucune ligne n'existe, en cree une avec les valeurs par defaut de l'entite.
   */
  async getContact(): Promise<ContactContent> {
    const existing = await this.contactRepository.findOne({ where: {} });

    if (existing) {
      return existing;
    }

    this.logger.log(
      'Aucun contenu contact existant, creation avec les valeurs par defaut',
    );
    const contact = this.contactRepository.create();
    return this.contactRepository.save(contact);
  }

  /**
   * Met a jour le contenu contact avec les champs fournis dans le DTO.
   */
  async updateContact(dto: UpdateContactDto): Promise<ContactContent> {
    const contact = await this.getContact();

    Object.assign(contact, dto);

    const saved = await this.contactRepository.save(contact);
    this.logger.log(`Contenu contact mis a jour (id: ${saved.id})`);
    return saved;
  }
}
