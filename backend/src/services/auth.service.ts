import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../repositories/user.repository';
import { OAuth2Client } from 'google-auth-library';

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
    googleId: string;
  };
  idToken: string;
  expiresAt: number; // Unix timestamp in seconds
}

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    const clientId = this.configService.get<string>('google.clientId');
    this.googleClient = new OAuth2Client(clientId);
  }

  /**
   * Verify Google ID token and return user payload
   */
  async verifyGoogleToken(idToken: string) {
    const clientId = this.configService.get<string>('google.clientId');

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: clientId,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Invalid token payload');
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  /**
   * Login or register user with Google token
   */
  async login(idToken: string): Promise<LoginResponse> {
    // Verify Google token
    const googlePayload = await this.verifyGoogleToken(idToken);

    if (!googlePayload.email || !googlePayload.sub) {
      throw new UnauthorizedException('Invalid token: missing email or sub');
    }

    // Find or create user in database
    const user = await this.userRepository.findOrCreate({
      googleId: googlePayload.sub,
      email: googlePayload.email,
      name: googlePayload.name || googlePayload.email,
      picture: googlePayload.picture,
    });

    if (!user.isActive) {
      throw new UnauthorizedException('User account is deactivated');
    }

    // Get expiration time from Google JWT (exp is in seconds)
    const expiresAt = googlePayload.exp || Math.floor(Date.now() / 1000) + 3600; // Default 1 hour if not present

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        picture: user.picture,
        googleId: user.googleId,
      },
      idToken, // Return the Google JWT token
      expiresAt, // Return expiration timestamp
    };
  }
}

