import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Mensaje de bienvenida' })
  @ApiResponse({ status: 200, description: 'Retorna mensaje de bienvenida' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/health')
  @ApiTags('health')
  @ApiOperation({ summary: 'Verifica el estado del servicio' })
  @ApiResponse({
    status: 200,
    description: 'Servicio funcionando correctamente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2025-11-25T10:00:00.000Z' },
        service: { type: 'string', example: 'dashboard-backend' },
      },
    },
  })
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'dashboard-backend',
    };
  }
}
