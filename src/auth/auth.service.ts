import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity'; // Assuming you've defined your User entity
import { EncryptService } from '../encryption/encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: EncryptService,
  ) {}

  async sign(credentials: { email: string; password: string }): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: credentials.email,
      },
    });

    if (!user)
      throw new HttpException(
        'The specified user does not exist',
        HttpStatus.BAD_REQUEST,
      );

    const isValid = await this.passwordService.comparePassword(
      credentials.password,
      user.password,
    );

    if (!isValid)
      throw new HttpException(
        'The email/password combination is invalid',
        HttpStatus.BAD_REQUEST,
      );

    const tokens = await this.jwtService.generateToken(user); // Pass the user object here

    return { tokens, user: { id: user.id, email: user.email } };
  }

  async refreshToken(token: string): Promise<any> {
    const user = await this.jwtService.verifyToken(token);
    const tokens = await this.jwtService.generateToken(user);

    return { tokens, user };
  }
}
