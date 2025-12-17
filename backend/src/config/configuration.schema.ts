import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class GoogleConfig {
  @IsString()
  clientId: string;
}

class GeminiConfig {
  @IsString()
  apiKey: string;
}

class CorsConfig {
  @IsArray()
  @IsString({ each: true })
  allowedOrigins: string[];
}

export class ConfigurationSchema {
  @IsNumber()
  @IsOptional()
  port?: number;

  @ValidateNested()
  @Type(() => GoogleConfig)
  google: GoogleConfig;

  @ValidateNested()
  @Type(() => GeminiConfig)
  gemini: GeminiConfig;

  @ValidateNested()
  @Type(() => CorsConfig)
  cors: CorsConfig;
}
