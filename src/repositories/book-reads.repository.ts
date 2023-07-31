import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { BookRead } from '../entities/book-read.entity';

@Injectable()
export class BookReadsRepository {
  constructor(
    @InjectRepository(BookRead)
    private bookReadsRepository: Repository<BookRead>,
  ) {}

  async intersectInterval(start: number, book: Book): Promise<BookRead> {
    return await this.bookReadsRepository.findOne({
      where: {
        book,
        start_page: LessThan(start), // Intersect for user
        end_page: MoreThan(start), // Intersect for user
      },
    });
  }

  async saveReadingInterval(readingInterval: BookRead): Promise<void> {
    await this.bookReadsRepository.save(readingInterval);
  }

  async getReadingIntervalsByBookId(bookId: number): Promise<BookRead[]> {
    return this.bookReadsRepository.find({
      where: { book: { id: bookId } },
    });
  }
}
