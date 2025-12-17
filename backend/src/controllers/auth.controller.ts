import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

class LoginDto {
  idToken: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 requests per minute
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with Google ID token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        idToken: {
          type: 'string',
          description: 'Google ID token from client',
        },
      },
      required: ['idToken'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, Google JWT token set as HTTP-only cookie',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            picture: { type: 'string' },
            googleId: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired Google token',
  })
  @ApiResponse({
    status: 429,
    description: 'Too Many Requests - Rate limit exceeded',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { idToken } = loginDto;

      if (!idToken) {
        throw new UnauthorizedException('ID token is required');
      }

      // Login user (creates if doesn't exist)
      const loginResponse = await this.authService.login(idToken);

      // Calculate maxAge from Google JWT expiration time
      // expiresAt is in seconds (Unix timestamp), maxAge needs milliseconds
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const expiresIn = loginResponse.expiresAt - now; // Remaining seconds

      const maxAge = expiresIn * 1000; // Convert to milliseconds

      // Set Google JWT as HTTP-only cookie
      const nodeEnv = this.configService.get<string>('NODE_ENV') || 'development';
      const isProduction = nodeEnv === 'production';
      res.cookie('access_token', loginResponse.idToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: maxAge, // Use expiration time from Google JWT
        path: '/',
      });

      return loginResponse;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }

  @Get('verify')
  @Throttle({ default: { limit: 20, ttl: 60000 } }) // 20 requests per minute
  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify if the current user is authenticated' })
  @ApiResponse({
    status: 200,
    description: 'User is authenticated',
    schema: {
      type: 'object',
      properties: {
        authenticated: { type: 'boolean' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            picture: { type: 'string' },
            googleId: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authenticated or token is invalid',
  })
  @ApiResponse({
    status: 429,
    description: 'Too Many Requests - Rate limit exceeded',
  })
  async verify(@CurrentUser() user: any) {
    return {
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        googleId: user.googleId,
      },
    };
  }

  @Post('logout')
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per minute
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user and clear authentication cookie' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Too Many Requests - Rate limit exceeded',
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    const nodeEnv = this.configService.get<string>('NODE_ENV') || 'development';
    const isProduction = nodeEnv === 'production';

    // Clear the access_token cookie
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 0, // Expire immediately
      path: '/',
    });

    return {
      message: 'Logout successful',
    };
  }
}

