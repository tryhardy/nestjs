import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';

import { BooksService } from './books.service';
import { BookCreateDto } from './interfaces/dto/book_create';
import { BookDocument } from './schemas/book.schema';
import { ParamId } from './interfaces/param_id'

@Controller('/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

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
  ): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
      return this.service.update(id, body);
  }

  @Delete(':id')
  public delete(@Param() { id }: ParamId): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
      return this.service.delete(id);
  }
}