import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiController } from './controllers/ai.controller';
import { AuthController } from './controllers/auth.controller';
import { GeminiService } from './services/gemini.service';
import { AuthService } from './services/auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { ActionsGuard } from './guards/actions.guard';
import configuration, { validateConfiguration } from './config/configuration';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validate: validateConfiguration,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.mongodbUri'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // TTL is in seconds in config, but ThrottlerModule expects milliseconds
        const ttlSeconds = configService.get<number>('throttler.ttl') || 60;
        const limit = configService.get<number>('throttler.limit') || 10;
        return [
          {
            ttl: ttlSeconds * 1000, // Convert seconds to milliseconds
            limit,
          },
        ];
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, AiController, AuthController],
  providers: [
    AppService,
    GeminiService,
    AuthService,
    UserRepository,
    GoogleAuthGuard,
    ActionsGuard,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [UserRepository, AuthService],
})
export class AppModule {}
