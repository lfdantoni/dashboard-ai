import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { DashboardInfo } from './entities/dashboard-info.entity';
import { HealthCheck } from './entities/health-check.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Mensaje de bienvenida' })
  @ApiResponse({ status: 200, description: 'Retorna mensaje de bienvenida' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiTags('health')
  @ApiOperation({ summary: 'Verifica el estado del servicio' })
  @ApiResponse({
    status: 200,
    description: 'Servicio funcionando correctamente',
    type: HealthCheck,
  })
  getHealth(): HealthCheck {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'dashboard-backend',
    };
  }

  @Get('dashboard-info')
  @UseGuards(GoogleAuthGuard)
  @ApiTags('dashboard')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get dashboard information (requires Google authentication)',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard information retrieved successfully',
    type: DashboardInfo,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  getDashboardInfo(@CurrentUser() user: any): DashboardInfo {
    return {
      message: 'Dashboard data for authenticated user',
      user: {
        email: user.email,
        name: user.name,
        picture: user.picture,
        sub: user.sub,
      },
      stats: {
        totalUsers: 1250,
        activeProjects: 42,
        pendingTasks: 15,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
