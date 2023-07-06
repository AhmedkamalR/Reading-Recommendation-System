import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/books.repository';
import { Book } from '../entities/book.entity';
import { LoggingService } from '../services/logging.service';
import { BookRequestDto } from '../dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository,
    private loggingService: LoggingService,
  ) {}

  async createBook(bookRequestDto: BookRequestDto): Promise<Book> {
    return this.bookRepository.createBook(bookRequestDto);
  }

  async getBookById(id: number): Promise<Book> {
    return this.bookRepository.getBookById(id);
  }

  async getTopFiveBooks(): Promise<Book[]> {
    return this.bookRepository.getTopFiveBooks();
  }
}
