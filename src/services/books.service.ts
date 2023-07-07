import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/books.repository';
import { Book } from '../entities/book.entity';
import { LoggingService } from '../services/logging.service';
import { BookRequestDto } from '../dto/book.dto';
import { AppError } from 'src/util/error';
import { ResponseCode } from 'src/util/response';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository,
    private loggingService: LoggingService,
  ) {}

  async createBook(bookRequestDto: BookRequestDto): Promise<Book> {
    return this.bookRepository.createBook(bookRequestDto);
  }

  async modifyBook(bookRequestDto: BookRequestDto, id: string): Promise<Book> {
    let book = await this.bookRepository.getBookById(Number(id));
    if (!book) {
      throw new AppError('Book not Found', ResponseCode.NOT_FOUND);
    }

    book = { ...book, ...bookRequestDto, id: Number(id) };
    return this.bookRepository.saveBook(book);
  }

  async getBookById(id: number): Promise<Book> {
    return this.bookRepository.getBookById(id);
  }

  async getTopFiveBooks(): Promise<Book[]> {
    return this.bookRepository.getTopFiveBooks();
  }
}
