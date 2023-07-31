import { Injectable } from '@nestjs/common';
import { BookService } from './books.service';
import { AppError } from '../util/error';
import { ResponseCode } from 'src/util/response';
import { Book } from 'src/entities/book.entity';
import { BookReadsRepository } from 'src/repositories/book-reads.repository';
import { BookRead } from 'src/entities/book-read.entity';

@Injectable()
export class BookReadsService {
  constructor(
    private bookReadsRepository: BookReadsRepository,
    private bookService: BookService,
  ) {}

  async submitReadingInterval(
    book_id: number,
    start_page: number,
    end_page: number,
  ): Promise<void> {
    const book = await this.bookService.getBookById(book_id);

    if (!book) {
      throw new AppError('User or book not found.', ResponseCode.NOT_FOUND);
    }
    if (start_page > end_page) {
      throw new Error('Invalid start and end pages');
    }

    const isIntersectIntervalExists =
      await this.bookReadsRepository.intersectInterval(start_page, book);

    if (isIntersectIntervalExists) {
      start_page = isIntersectIntervalExists.end_page;
    }

    await this.saveReadingInterval(book, start_page, end_page);
  }

  async saveReadingInterval(
    book: Book,
    start_page: number,
    end_page: number,
  ): Promise<void> {
    const bookRead = new BookRead();
    bookRead.book = book;
    bookRead.start_page = start_page;
    bookRead.end_page = end_page;

    await this.bookReadsRepository.saveReadingInterval(bookRead);
  }

  async getTopRecommendedBooks(): Promise<any> {
    const books = await this.bookService.getTopFiveBooks();
    if (books.length === 0) {
      throw new Error('No top recommended books found');
    }

    return books;
  }
}
