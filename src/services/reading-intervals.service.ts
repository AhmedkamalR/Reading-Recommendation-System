import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadingIntervalRepository } from '../repositories/reading-intervals.repository';
import { UserService } from '../services/users.service';
import { BookService } from '../services/books.service';
import { ReadingInterval } from '../entities/reading-interval.entity';
import { AppResponse, ResponseCode } from '../util/response';
import { AppError, ErrorMsg } from '../util/error';

@Injectable()
export class ReadingIntervalService {
  constructor(
    private readingIntervalRepository: ReadingIntervalRepository,
    private userService: UserService,
    private bookService: BookService,
  ) {}

  async submitReadingInterval(
    userId: number,
    bookId: number,
    startPage: number,
    endPage: number,
  ): Promise<void> {
    const user = await this.userService.getUserById(userId);
    const book = await this.bookService.getBookById(bookId);

    if (!user || !book) {
      throw new NotFoundException('User or book not found.');
    }
    if (startPage > endPage) {
      throw new AppError(ErrorMsg.BAD_REQUEST, ResponseCode.BAD_REQUEST);
    }

    const readingInterval = new ReadingInterval();
    readingInterval.user = user;
    readingInterval.book = book;
    readingInterval.start_page = startPage;
    readingInterval.end_page = endPage;

    await this.readingIntervalRepository.saveReadingInterval(readingInterval);
  }

  async getTopRecommendedBooks(userId: number): Promise<AppResponse> {
    const books = await this.bookService.getTopFiveBooks(userId);
    if (books.length === 0) {
      throw new AppError(ErrorMsg.NOT_FOUND, ResponseCode.NOT_FOUND);
    }

    return new AppResponse(ResponseCode.SUCCESS, books);
  }

  // async getNumOfReadPages(bookId: number): Promise<number> {
  //   const readingIntervals =
  //     await this.readingIntervalRepository.getReadingIntervalsByBookId(bookId);

  //   return readingIntervals.reduce((sum, interval) => {
  //     return sum + (interval.endPage - interval.startPage + 1);
  //   }, 0);
  // }
}
// Intervals (UserId) >> Left Join  Books (BookId) >> Order By ReadCount
