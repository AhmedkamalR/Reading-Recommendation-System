import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadingIntervalRepository } from '../repositories/reading-intervals.repository';
import { UserService } from '../services/users.service';
import { BookService } from '../services/books.service';
import { ReadingInterval } from '../entities/reading-interval.entity';
import { LoggingService } from '../services/logging.service';
import { AppError, ErrorMsg } from '../util/error';
import { ResponseCode } from 'src/util/response';
import { Book } from 'src/entities/book.entity';

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
    const user = await this.userService.getUserById(user_id);
    const book = await this.bookService.getBookById(book_id);

    if (!user || !book) {
      throw new AppError('User or book not found.', ResponseCode.NOT_FOUND);
    }
    if (start_page > end_page) {
      throw new Error('Invalid start and end pages');
    }

    const isIntersectIntervalExists =
      await this.readingIntervalRepository.intersectInterval(
        start_page,
        book,
        user,
      );

    if (isIntersectIntervalExists) {
      start_page = isIntersectIntervalExists.end_page;
    }

    const readingInterval = new ReadingInterval();
    readingInterval.user = user;
    readingInterval.book = book;
    readingInterval.start_page = start_page;
    readingInterval.end_page = end_page;

    await this.readingIntervalRepository.saveReadingInterval(readingInterval);
  }

  async getTopRecommendedBooks(): Promise<any> {
    const books = await this.bookService.getTopFiveBooks();
    if (books.length === 0) {
      throw new Error('No top recommended books found');
    }
    
    return books;
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
