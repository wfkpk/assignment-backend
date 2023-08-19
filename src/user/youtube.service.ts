import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class YoutubeService {
  private readonly apiKey: string = 'AIzaSyDWtMnXbIdbDgT0VFGVU_dQij_glisHlmM';

  async searchVideos(query: string, maxResults: number): Promise<any[]> {
    const apiUrl = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
      key: this.apiKey,
      q: query,
      maxResults: maxResults.toString(),
      part: 'snippet',
      type: 'video',
    };

    try {
      const response = await axios.get(apiUrl, { params });
      return response.data.items.map((item) => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
      }));
    } catch (error) {
      throw new Error('Error fetching YouTube data.');
    }
  }
}
