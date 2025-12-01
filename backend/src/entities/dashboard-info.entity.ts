import { ApiProperty } from '@nestjs/swagger';

export class UserInfo {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'https://lh3.googleusercontent.com/...' })
  picture: string;

  @ApiProperty({ example: '1234567890' })
  sub: string;
}

export class DashboardStats {
  @ApiProperty({ example: 1250 })
  totalUsers: number;

  @ApiProperty({ example: 42 })
  activeProjects: number;

  @ApiProperty({ example: 15 })
  pendingTasks: number;
}

export class DashboardInfo {
  @ApiProperty({ example: 'Dashboard data for authenticated user' })
  message: string;

  @ApiProperty({
    description: 'Authenticated user information',
    type: UserInfo,
  })
  user: UserInfo;

  @ApiProperty({ description: 'Dashboard statistics', type: DashboardStats })
  stats: DashboardStats;

  @ApiProperty({ example: '2025-11-28T10:00:00.000Z' })
  timestamp: string;
}
