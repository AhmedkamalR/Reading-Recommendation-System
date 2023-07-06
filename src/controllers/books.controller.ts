import { Body, Controller, Post, Put, UseGuards, Param } from '@nestjs/common';
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

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put('/:id')
  async modifyBook(
    @Body() bookRequestDto: BookRequestDto,
    @Param('id') id: string,
  ) {
    return await this.booksService.modifyBook(bookRequestDto, id);
  }
}
