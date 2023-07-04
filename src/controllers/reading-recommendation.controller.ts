import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReadingIntervalService } from '../services/reading-intervals.service';
import { AppResponse } from 'src/util/response';

@Controller('reading-intervals')
export class ReadingRecommendationController {
  constructor(private readingIntervalService: ReadingIntervalService) {}

  @Post('submit-interval')
  async submitReadingInterval(
    @Body('user_id') userId: number,
    @Body('book_id') bookId: number,
    @Body('start_page') startPage: number,
    @Body('end_page') endPage: number,
  ): Promise<{ status_code: string }> {
    await this.readingIntervalService.submitReadingInterval(
      userId,
      bookId,
      startPage,
      endPage,
    );
    return { status_code: 'success' };
  }

  @Post('top-books')
  async getTopRecommendedBooks(
    @Body('user_id') userId: number,
  ): Promise<AppResponse> {
    return this.readingIntervalService.getTopRecommendedBooks(userId);
  }
}
