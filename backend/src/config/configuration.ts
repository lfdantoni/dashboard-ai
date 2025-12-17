import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ConfigurationSchema } from './configuration.schema';

export default (): ConfigurationSchema => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173'],
  },
});

export async function validateConfiguration(
  config: Record<string, unknown>,
): Promise<ConfigurationSchema> {
  const validatedConfig = plainToClass(ConfigurationSchema, config, {
    enableImplicitConversion: true,
  });
  const errors = await validate(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}).join(', '))
      .join('; ');
    throw new Error(`Configuration validation error: ${errorMessages}`);
  }
  return validatedConfig;
}

