import { Injectable } from '@nestjs/common';
import { ReadingIntervalRepository } from '../repositories/reading-intervals.repository';
import { UserService } from '../services/users.service';
import { BookService } from '../services/books.service';
import { ReadingInterval } from '../entities/reading-interval.entity';
import { AppError } from '../util/error';
import { ResponseCode } from 'src/util/response';
import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';

@Injectable()
export class ReadingIntervalService {
  constructor(
    private readingIntervalRepository: ReadingIntervalRepository,
    private userService: UserService,
    private bookService: BookService,
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
    // 1-Happy Scenario
    // 0 >> 30
    // 50 >> 60

    // 2- Intersect
    // 10 >> 60
    // 30 >> 70 >> Convert >> (60 >> 70) >> Save in DB
    const isIntersectIntervalExists =
      await this.readingIntervalRepository.intersectInterval(
        start_page,
        book,
        user,
      );

    if (isIntersectIntervalExists) {
      start_page = isIntersectIntervalExists.end_page;
    }

    await this.saveReadingInterval(user, book, start_page, end_page);
  }

  async saveReadingInterval(
    user: User,
    book: Book,
    start_page: number,
    end_page: number,
  ): Promise<void> {
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

// Dependency Injection
// 1- Singleton From Class >> One Object only in Memory
// 2- Inject Object in Constructor

