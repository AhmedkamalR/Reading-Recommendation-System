import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createBook(name: string, numOfPages: number): Promise<Book> {
    const book = new Book();
    book.name = name;
    book.numOfPages = numOfPages;
    return this.bookRepository.save(book);
  }

  async getBookById(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async getTopFiveBooks(userId: number): Promise<Book[]> {
    return await this.bookRepository.query(`
    SELECT book_id, name, "numOfPages", end_page - start_page AS num_of_read_pages 
    FROM reading_interval
    LEFT JOIN book ON reading_interval.book_id = book.id
    WHERE user_id = ${userId}
    ORDER BY num_of_read_pages DESC LIMIT 5`);
  }
}
