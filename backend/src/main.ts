import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable cookie parser
  app.use(cookieParser());

  // Configurar prefijo global
  app.setGlobalPrefix('api');

  // Habilitar versionado
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Habilitar CORS para el frontend
  const allowedOrigins = configService.get<string[]>('cors.allowedOrigins');

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dashboard AI API')
    .setDescription('API REST para Dashboard AI')
    .setVersion('1.0')
    .addTag('health')
    .addTag('dashboard')
    .addTag('ai')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('port');
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
  console.log(`📚 Swagger docs disponible en http://localhost:${port}/api/docs`);
}
bootstrap();
