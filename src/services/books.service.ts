import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/books.repository';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async createBook(name: string, numOfPages: number): Promise<Book> {
    return this.bookRepository.createBook(name, numOfPages);
  }

  async getBookById(id: number): Promise<Book> {
    return this.bookRepository.getBookById(id);
  }

  async getTopFiveBooks(userId: number): Promise<Book[]> {
    return this.bookRepository.getTopFiveBooks(userId);
  }
}
