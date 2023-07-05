import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingRecommendationController } from '../src/controllers/reading-recommendation.controller';
import { UserService } from '../src/services/users.service';
import { UserRepository } from '../src/repositories/users.repository';
import { BookService } from '../src/services/books.service';
import { BookRepository } from '../src/repositories/books.repository';
import { ReadingIntervalService } from '../src/services/reading-intervals.service';
import { ReadingIntervalRepository } from '../src/repositories/reading-intervals.repository';
import { User } from '../src/entities/user.entity';
import { Book } from '../src/entities/book.entity';
import { ReadingInterval } from '../src/entities/reading-interval.entity';
import ormconfig from '../config/orm.config.development';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([User, Book, ReadingInterval]),
  ],
  controllers: [ReadingRecommendationController],
  providers: [
    UserService,
    UserRepository,
    BookService,
    BookRepository,
    ReadingIntervalService,
    ReadingIntervalRepository,
  ],
})
export class AppModule {}
