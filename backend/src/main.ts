import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('BACKEND_PORT', 4000);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  const corsOrigins = configService
    .get<string>('CORS_ORIGINS', 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim());

  // Fichiers statiques (uploads)
  app.useStaticAssets(path.join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // CORS
  app.enableCors({ origin: corsOrigins, credentials: true });

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger — dev uniquement
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Oser Réussir API')
      .setDescription('Documentation de l\'API backend')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    console.log(`Swagger disponible sur http://localhost:${port}/api/docs`);
  }

  await app.listen(port);
  console.log(`Backend démarré sur http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Erreur critique au démarrage :', err);
  process.exit(1);
});
