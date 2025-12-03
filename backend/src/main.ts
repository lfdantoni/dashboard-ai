import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar prefijo global
  app.setGlobalPrefix('api');

  // Habilitar versionado
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Habilitar CORS para el frontend
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173'];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Dashboard AI API')
    .setDescription('API REST para Dashboard AI')
    .setVersion('1.0')
    .addTag('health')
    .addTag('dashboard')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('🚀 Backend corriendo en http://localhost:3000');
  console.log('📚 Swagger docs disponible en http://localhost:3000/api/docs');
}
bootstrap();
