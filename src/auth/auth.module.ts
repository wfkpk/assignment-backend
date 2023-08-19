import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EncryptModule } from 'src/encryption/encrypt.module';
import { TokenModule } from 'src/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
@Module({
  imports: [EncryptModule, TokenModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
