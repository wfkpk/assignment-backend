import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { TokenModule } from 'src/jwt/jwt.module';
import { UserController } from './user.controller';
import { YoutubeService } from './youtube.service';
import { EncryptModule } from 'src/encryption/encrypt.module';
import { SavedVideo } from './entity/saved-video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SavedVideo]),
    TokenModule,
    EncryptModule,
  ],
  controllers: [UserController],
  providers: [UserService, YoutubeService],
})
export class UserModule {}
