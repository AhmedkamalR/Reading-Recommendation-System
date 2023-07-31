import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class BookRead {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  start_page: number;

  @Column()
  end_page: number;
}
