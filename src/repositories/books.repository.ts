import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { BookRequestDto } from '../dto/book.dto';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createBook(bookRequestDto: BookRequestDto): Promise<Book> {
    return this.bookRepository.save({ ...bookRequestDto });
  }

  async saveBook(bookRequestDto: BookRequestDto): Promise<Book> {
    return this.bookRepository.save(bookRequestDto);
  }
  async getBookById(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async getTopFiveBooks(): Promise<Book[]> {
    return await this.bookRepository.query(`
    SELECT book_id, name, "numOfPages" AS num_of_pages, SUM(end_page - start_page) AS num_of_read_pages 

    FROM reading_interval

    LEFT JOIN book ON reading_interval.book_id = book.id

    GROUP BY book_id, name, num_of_pages

    ORDER BY num_of_read_pages DESC LIMIT 5`);
  }
}
