import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { JwtService } from 'src/jwt/jwt.service';
import { YoutubeService } from './youtube.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: { email: string; password: string }) {
    const user = await this.userService.createUser(body.email, body.password);
    return { user };
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')[1];
    const userId = this.jwtService.extractUserId(token);
    return {
      data: await this.userService.findOneById(userId),
      status: 'success',
    };
  }

  @Post('add-in-watch-later')
  @UseGuards(JwtAuthGuard)
  async addInWatchLater(
    @Headers('authorization') authorization: string,
    @Body() body: { videoId: string },
  ) {
    const token = authorization.split(' ')[1];
    const userId = this.jwtService.extractUserId(token);
  }

  @Get('search')
  async searchVideos(@Query('q') query: string) {
    try {
      const videos = await this.youtubeService.searchVideos(query, 10);
      return { videos };
    } catch (error) {
      return { error: 'An error occurred while fetching YouTube data.' };
    }
  }
}
