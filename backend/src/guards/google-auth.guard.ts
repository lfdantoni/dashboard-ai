import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Try to get token from cookie first, then from Authorization header
    let token = request.cookies?.access_token;
    
    if (!token) {
      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify Google token using AuthService
      const googlePayload = await this.authService.verifyGoogleToken(token);

      if (!googlePayload.sub) {
        throw new UnauthorizedException('Invalid token: missing Google ID');
      }

      // Find user in MongoDB by Google ID
      const user = await this.userRepository.findByGoogleId(googlePayload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Validate that user is active
      if (!user.isActive) {
        throw new UnauthorizedException('User account is deactivated');
      }

      // Attach user from MongoDB to request (not just Google payload)
      request.user = {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        picture: user.picture,
        googleId: user.googleId,
        actions: user.actions || [],
        // Include Google payload data for backward compatibility
        sub: googlePayload.sub,
        ...googlePayload,
      };

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
