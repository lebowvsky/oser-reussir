import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.userRepo.count();

    if (count === 0) {
      const email = this.configService.get<string>('ADMIN_EMAIL');
      const password = this.configService.get<string>('ADMIN_PASSWORD');
      const hash = await bcrypt.hash(password!, 10);

      const user = this.userRepo.create({ email: email!, password: hash });
      await this.userRepo.save(user);

      this.logger.log('Admin user seeded from environment variables');
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async updateCredentials(
    userId: string,
    dto: UpdateCredentialsDto,
  ): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    const isValid = await bcrypt.compare(dto.currentPassword, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Mot de passe actuel incorrect');
    }

    if (dto.email) {
      user.email = dto.email;
    }

    if (dto.newPassword) {
      user.password = await bcrypt.hash(dto.newPassword, 10);
    }

    await this.userRepo.save(user);

    return { message: 'Identifiants mis à jour avec succès' };
  }
}
