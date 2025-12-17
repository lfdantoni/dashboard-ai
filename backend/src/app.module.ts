import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiController } from './controllers/ai.controller';
import { GeminiService } from './services/gemini.service';
import configuration, { validateConfiguration } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validate: validateConfiguration,
    }),
  ],
  controllers: [AppController, AiController],
  providers: [AppService, GeminiService],
})
export class AppModule {}
