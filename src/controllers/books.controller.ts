import { Body, Controller, Post } from '@nestjs/common';
import { BookService } from '../services/books.service';
import { BookRequestDto } from '../dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BookService) {}

  @Post()
  async addBook(@Body() bookRequestDto: BookRequestDto) {
    return await this.booksService.createBook(bookRequestDto)
  }
}
