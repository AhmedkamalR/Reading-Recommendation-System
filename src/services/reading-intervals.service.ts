import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadingIntervalRepository } from '../repositories/reading-intervals.repository';
import { UserService } from '../services/users.service';
import { BookService } from '../services/books.service';
import { ReadingInterval } from '../entities/reading-interval.entity';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class ReadingIntervalService {
  constructor(
    private readingIntervalRepository: ReadingIntervalRepository,
    private userService: UserService,
    private bookService: BookService,
    private loggingService: LoggingService,
  ) {}

  async submitReadingInterval(
    user_id: number,
    book_id: number,
    start_page: number,
    end_page: number,
  ): Promise<void> {
    try {
      const user = await this.userService.getUserById(user_id);
      const book = await this.bookService.getBookById(book_id);

      if (!user || !book) {
        throw new NotFoundException('User or book not found.');
      }
      if (start_page > end_page) {
        throw new Error('Invalid start and end pages');
      }

      const readingInterval = new ReadingInterval();
      readingInterval.user = user;
      readingInterval.book = book;
      readingInterval.start_page = start_page;
      readingInterval.end_page = end_page;

      await this.readingIntervalRepository.saveReadingInterval(readingInterval);
    } catch (error) {
      this.loggingService.error(
        'Failed to submit reading interval',
        error.stack || '',
      );
      throw error;
    }
  }

  async getTopRecommendedBooks(user_id: number): Promise<any> {
    try {
      const books = await this.bookService.getTopFiveBooks(user_id);
      if (books.length === 0) {
        throw new Error('No top recommended books found');
      }

      return books;
    } catch (error) {
      this.loggingService.error(
        'Failed to get top recommended books',
        error.stack || '',
      );
      throw error;
    }
  }
}

// async getNumOfReadPages(bookId: number): Promise<number> {
//   const readingIntervals =
//     await this.readingIntervalRepository.getReadingIntervalsByBookId(bookId);

//   return readingIntervals.reduce((sum, interval) => {
//     return sum + (interval.endPage - interval.startPage + 1);
//   }, 0);
// }
// Intervals (UserId) >> Left Join  Books (BookId) >> Order By ReadCount
