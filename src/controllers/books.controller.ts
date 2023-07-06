import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BookService } from '../services/books.service';
import { BookRequestDto } from '../dto/book.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BookService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async addBook(@Body() bookRequestDto: BookRequestDto) {
    return await this.booksService.createBook(bookRequestDto);
  }
}
