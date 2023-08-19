import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity'; // Import your User entity
import { EncryptService } from 'src/encryption/encrypt.service';
import { SavedVideo } from './entity/saved-video.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: EncryptService,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      new BadRequestException(`User with email ${email} already exists`);
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async addVideoToWatchLater(userId: number, videoId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      new BadRequestException(`User already exists`);
    }
    const savedVideo = new SavedVideo();
    savedVideo.videoId = videoId;
    savedVideo.user = user;
    user.savedVideos.push(savedVideo);

    return await this.userRepository.save(user);
  }
}
