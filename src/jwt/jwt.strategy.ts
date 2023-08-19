import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { APP_CONFIG } from 'src/config';
import { User } from 'src/user/entity/user.entity'; // Import your User entity
import { UserService } from 'src/user/user.service'; // Import your UserService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: APP_CONFIG.jwtSecret,
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findOneById(payload.sub.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
