import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { ReadingInterval } from '../entities/reading-interval.entity';
import { Book } from '../entities/book.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ReadingIntervalRepository {
  constructor(
    @InjectRepository(ReadingInterval)
    private readingIntervalRepository: Repository<ReadingInterval>,
  ) {}

  async intersectInterval(
    start: number,
    book: Book,
    user,
  ): Promise<ReadingInterval> {
    return await this.readingIntervalRepository.findOne({
      where: {
        book,
        user,
        start_page: LessThan(start),
        end_page: MoreThan(start),
      },
    });
  }

  async saveReadingInterval(readingInterval: ReadingInterval): Promise<void> {
    await this.readingIntervalRepository.save(readingInterval);
  }

  async getReadingIntervalsByBookId(
    bookId: number,
  ): Promise<ReadingInterval[]> {
    return this.readingIntervalRepository.find({
      where: { book: { id: bookId } },
    });
  }
}
