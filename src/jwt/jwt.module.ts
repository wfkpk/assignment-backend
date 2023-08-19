import { Module } from '@nestjs/common';
import { APP_CONFIG } from 'src/config';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { EncryptModule } from 'src/encryption/encrypt.module';

@Module({
  imports: [
    JwtModule.register({
      secret: APP_CONFIG.jwtSecret,
      signOptions: { expiresIn: APP_CONFIG.accessTokenExpires },
    }),
    TypeOrmModule.forFeature([User]),
    EncryptModule,
  ],
  providers: [JwtService, JwtStrategy, UserService],
  exports: [JwtService, JwtStrategy],
})
export class TokenModule {}
