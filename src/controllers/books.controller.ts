import { Controller, Get } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book as BookInterface } from 'src/interfaces/book';

@Controller('/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  get(): BookInterface[] {
    return this.service.get();
  }
}