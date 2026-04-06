import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { HealthController } from './common/health/health.controller';
import { HeroModule } from './modules/hero/hero.module';
import { AproposModule } from './modules/apropos/apropos.module';
import { PourquiModule } from './modules/pourqui/pourqui.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // En Docker, les variables sont injectées via "environment:" du compose.
      // envFilePath n'est utilisé qu'en local hors Docker (fichier à la racine monorepo).
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        BACKEND_PORT: Joi.number().default(4000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().min(32).required(),
        CORS_ORIGINS: Joi.string().required(),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        synchronize: false, // JAMAIS true en production
        logging: config.get<string>('NODE_ENV') !== 'production',
        migrationsRun: false,
      }),
    }),

    HeroModule,
    AproposModule,
    PourquiModule,
    ContactModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
