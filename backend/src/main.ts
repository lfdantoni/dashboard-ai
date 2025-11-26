import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para el frontend
  app.enableCors({
    origin: 'http://localhost:5173', // URL del frontend React
    credentials: true,
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Dashboard AI API')
    .setDescription('API REST para Dashboard AI')
    .setVersion('1.0')
    .addTag('health')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('🚀 Backend corriendo en http://localhost:3000');
  console.log('📚 Swagger docs disponible en http://localhost:3000/api/docs');
}
bootstrap();
