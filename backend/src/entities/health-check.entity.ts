import { ApiProperty } from '@nestjs/swagger';

export class HealthCheck {
  @ApiProperty({ example: 'ok', description: 'Service status' })
  status: string;

  @ApiProperty({
    example: '2025-11-28T10:00:00.000Z',
    description: 'Current timestamp',
  })
  timestamp: string;

  @ApiProperty({ example: 'dashboard-backend', description: 'Service name' })
  service: string;
}
