import { ApiProperty } from '@nestjs/swagger';

export class AiAnalysisResponse {
  @ApiProperty({
    description: 'The AI-generated analysis result',
    example: 'Based on the provided data, I can see...',
  })
  result: string;

  @ApiProperty({
    description: 'Timestamp of when the analysis was performed',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;
}
