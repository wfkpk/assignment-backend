import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from 'src/user/entity/user.entity';
import { SavedVideo } from 'src/user/entity/saved-video.entity';
import { UserModule } from './user/user.module';
import { TokenModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { EncryptModule } from './encryption/encrypt.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: 'localhost', // Database host
      port: 5432, // Database port
      username: 'demo', // Database username
      password: 'demo', // Database password
      database: 'db', // Database name
      entities: [User, SavedVideo],
      synchronize: true,
    }),
    UserModule,
    TokenModule,
    AuthModule,
    EncryptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
