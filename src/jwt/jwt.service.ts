import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as os from 'os';
import { APP_CONFIG } from 'src/config';
import { User } from 'src/user/entity/user.entity'; // Import your User entity
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class JwtService {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  async generateToken(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      sub: {
        id: user.id,
        email: user.email,
      },
      iss: os.hostname(),
    };

    const accessToken = jwt.sign(payload, APP_CONFIG.jwtSecret, {
      expiresIn: APP_CONFIG.accessTokenExpires,
    });
    const refreshToken = jwt.sign(payload, APP_CONFIG.jwtSecret, {
      expiresIn: APP_CONFIG.refreshTokenExpires,
    });

    return { accessToken, refreshToken };
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const payload = jwt.verify(token, APP_CONFIG.jwtSecret) as any;
      return await this.jwtStrategy.validate(payload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  extractUserId(token: string): number {
    try {
      const payload = jwt.verify(token, APP_CONFIG.jwtSecret) as any;
      return payload.sub.id;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
