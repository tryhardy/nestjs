import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';

import { BooksService } from './books.service';
import { BookCreateDto } from './interfaces/dto/book_create';
import { BookDocument } from './schemas/book.schema';
import { ParamId } from './interfaces/param_id'
import { pipe } from 'rxjs';

@Controller('/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get(':id')
  getBook(): Promise<BookDocument[]> {
    return this.service.getAll();
  }

  @Get()
  getAll(): Promise<BookDocument[]> {
    return this.service.getAll();
  }

  @Post()
  public create(@Body() body: BookCreateDto): Promise<BookDocument>
  {
    return this.service.create(body);
  }

  @Put(':id')
  public update(
      @Param() { id }: ParamId,
      @Body() body: BookCreateDto,
  ): Promise<BookDocument> {
      return this.service.update(id, body);
  }

  @Delete(':id')
  public delete(@Param() { id }: ParamId): Promise<BookDocument> {
      return this.service.delete(id);
  }
}