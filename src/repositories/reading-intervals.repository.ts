import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingInterval } from '../entities/reading-interval.entity';

@Injectable()
export class ReadingIntervalRepository {
  constructor(
    @InjectRepository(ReadingInterval)
    private readingIntervalRepository: Repository<ReadingInterval>,
  ) {}

  async saveReadingInterval(readingInterval: ReadingInterval): Promise<void> {
    await this.readingIntervalRepository.save(readingInterval);
  }

  async getReadingIntervalsByBookId(bookId: number): Promise<ReadingInterval[]> {
    return this.readingIntervalRepository.find({ where: { book: { id: bookId } } });
  }
}
