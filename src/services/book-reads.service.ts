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

    const isReadAlreadyExistsWithinRange =
      await this.bookReadsRepository.isReadAlreadyExists(
        start_page,
        end_page,
        book,
      );
    if (isReadAlreadyExistsWithinRange) return;
    const { max } = await this.bookReadsRepository.getMaxPageRead(book);
    const { min } = await this.bookReadsRepository.getMinPageRead(book);

    if (!min && !max)
      return await this.saveReadingInterval(book, start_page, end_page);

    const newEndPageNotExceedMaxLimit =
      await this.bookReadsRepository.newEndPageNotExceedLimit(end_page, book);
    const newStartPageNotExceedMinLimit =
      await this.bookReadsRepository.newStartPageNotExceedMinLimit(
        start_page,
        book,
      );

    if (newEndPageNotExceedMaxLimit && newStartPageNotExceedMinLimit) return;

    // Handle Small Boundaries
    if (!newStartPageNotExceedMinLimit) {
      await this.saveReadingInterval(book, start_page, min);
    }
    // End Page New
    if (!newEndPageNotExceedMaxLimit) {
      start_page = max;
    }

    if (start_page === end_page) return;
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
    const books = await this.bookReadsRepository.getTopFiveBooks();
    if (books.length === 0) {
      throw new Error('No top recommended books found');
    }

    return books;
  }
}
