import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/books.repository';
import { Book } from '../entities/book.entity';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository,
    private loggingService: LoggingService,
  ) {}

  async createBook(name: string, numOfPages: number): Promise<Book> {
    try {
      return this.bookRepository.createBook(name, numOfPages);
    } catch (error) {
      this.loggingService.error('Failed to create book', error.stack || '');
    }
  }

  async getBookById(id: number): Promise<Book> {
    try {
      return this.bookRepository.getBookById(id);
    } catch (error) {
      this.loggingService.error('Failed to get book by ID', error.stack || '');
    }
  }

  async getTopFiveBooks(): Promise<Book[]> {
    return this.bookRepository.getTopFiveBooks();
  }
}
