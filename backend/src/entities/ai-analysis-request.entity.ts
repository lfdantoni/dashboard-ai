import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AiAnalysisRequest {
  @ApiProperty({
    description: 'The prompt to analyze with AI',
    example: 'Analyze the following data and provide insights...',
  })
  prompt: string;

  @ApiPropertyOptional({
    description: 'Base64-encoded image to include in the analysis (optional)',
    example: '/9j/4AAQSkZJRgABAQEAYABgAAD...',
  })
  imageBase64?: string;

  @ApiPropertyOptional({
    description: 'MIME type of the image (required if imageBase64 is provided)',
    example: 'image/jpeg',
    enum: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  })
  mimeType?: string;
}
