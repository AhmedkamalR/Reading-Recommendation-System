import { Controller, Post,Body} from '@nestjs/common';
import { ReadingIntervalService } from '../services/reading-intervals.service';
import { AppResponse } from 'src/util/response';


@Controller('reading-intervals')
export class ReadingRecommendationController {
  constructor(private readingIntervalService: ReadingIntervalService) {}

  @Post('submit-interval')
  async submitReadingInterval(
    @Body('user_id') user_id: number,
    @Body('book_id') book_id: number,
    @Body('start_page') start_page: number,
    @Body('end_page') end_page: number,
  ): Promise<{ status_code: string }> {
    await this.readingIntervalService.submitReadingInterval(
      user_id,
      book_id,
      start_page,
      end_page,
    );
    return { status_code: 'success'};
  }

  @Post('top-books')
 async getTopRecommendedBooks(
    @Body('user_id') user_id: number,
  ): Promise<AppResponse> {
    return this.readingIntervalService.getTopRecommendedBooks(user_id);
  }
  
}