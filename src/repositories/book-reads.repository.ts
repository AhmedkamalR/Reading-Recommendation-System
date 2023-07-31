import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Book } from '../entities/book.entity';
import { BookRead } from '../entities/book-read.entity';
import { MaxReads, MinReads } from 'src/dto/book.dto';

@Injectable()
export class BookReadsRepository {
  constructor(
    @InjectRepository(BookRead)
    private bookReadsRepository: Repository<BookRead>,
  ) {}

  async isReadAlreadyExists(
    start: number,
    end: number,
    book: Book,
  ): Promise<BookRead> {
    return await this.bookReadsRepository.findOne({
      where: {
        book,
        start_page: LessThanOrEqual(start), // Intersect for user
        end_page: MoreThanOrEqual(end), // Intersect for user
      },
    });
  }

  async newEndPageNotExceedLimit(end: number, book: Book): Promise<BookRead> {
    return await this.bookReadsRepository.findOne({
      where: {
        book,
        end_page: MoreThan(end), // Intersect for user
      },
    });
  }

  async newStartPageNotExceedMinLimit(
    start: number,
    book: Book,
  ): Promise<BookRead> {
    return await this.bookReadsRepository.findOne({
      where: {
        book,
        start_page: LessThanOrEqual(start), // Intersect for user
      },
    });
  }

  async getMaxPageRead(book: Book): Promise<MaxReads> {
    const query = this.bookReadsRepository.createQueryBuilder('book_read');
    query
      .select('MAX(book_read.end_page)', 'max')
      .where(`book_read.book_id = (${book.id})`);
    return query.getRawOne();
  }

  async getMinPageRead(book: Book): Promise<MinReads> {
    const query = this.bookReadsRepository.createQueryBuilder('book_read');
    query
      .select('MIN(book_read.start_page)', 'min')
      .where(`book_read.book_id = (${book.id})`);
    return query.getRawOne();
  }

  async saveReadingInterval(readingInterval: BookRead): Promise<void> {
    await this.bookReadsRepository.save(readingInterval);
  }

  async getReadingIntervalsByBookId(bookId: number): Promise<BookRead[]> {
    return this.bookReadsRepository.find({
      where: { book: { id: bookId } },
    });
  }

  async getTopFiveBooks(): Promise<Book[]> {
    return await this.bookReadsRepository.query(`
    SELECT book_id, name, "numOfPages" AS num_of_pages, SUM(end_page - start_page) AS num_of_read_pages 

    FROM book_read

    LEFT JOIN book ON book_read.book_id = book.id

    GROUP BY book_id, name, num_of_pages

    ORDER BY num_of_read_pages DESC LIMIT 5`);
  }
}
