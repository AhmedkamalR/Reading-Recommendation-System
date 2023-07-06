import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/entities/user.entity';
import { ReadingRecommendationController } from './controllers/reading-recommendation.controller';
import { UserService } from './services/users.service';
import { UserRepository } from '../src/repositories/users.repository';
import { BookService } from './services/books.service';
import { BookRepository } from './repositories/books.repository';
import { ReadingIntervalService } from './services/reading-intervals.service';
import { ReadingIntervalRepository } from './repositories/reading-intervals.repository';
import { Book } from './entities/book.entity';
import { ReadingInterval } from './entities/reading-interval.entity';
import { LoggingService } from './services/logging.service';
import ormconfig from '../config/orm.config.development';
import { UsersController } from './controllers/users.controller';
import { CryptService } from './services/crypt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([User, UserRepository, Book, ReadingInterval]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'JWT_SECRET',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [ReadingRecommendationController, UsersController],
  providers: [
    UserService,
    UserRepository,
    BookService,
    BookRepository,
    ReadingIntervalService,
    ReadingIntervalRepository,
    LoggingService,
    CryptService,
  ],
})
export class AppModule {}
