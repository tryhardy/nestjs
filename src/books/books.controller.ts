import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';

import { BookSchema } from "./validation/schemas/book.schema";
import { JoiValidationPipe } from "./validation/joi.validation.pipe";
import { BooksService } from './books.service';
import { BookCreateDto } from './interfaces/dto/book.create';
import { Book, BookDocument } from './schemas/book.schema';
import { ParamId } from './interfaces/param_id';

@Controller('/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.service.getAll();
  }

  @UsePipes(new JoiValidationPipe(BookSchema))
  @Post()
  create(@Body() body: BookCreateDto): Promise<Book>
  {
    return this.service.create(body);
  }

  @Put(':id')
  update(
      @Param() { id }: ParamId,
      @Body(new JoiValidationPipe(BookSchema)) body: BookCreateDto
  ): Promise<Book> {
      return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param() { id }: ParamId): Promise<Book> {
      return this.service.delete(id);
  }
}