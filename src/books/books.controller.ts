import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';

import { BookSchema } from "./validation/schemas/book.schema";
import { JoiValidationPipe } from "./validation/joi.validation.pipe";
import { BooksService } from './books.service';
import { BookCreateDto } from './interfaces/dto/book.create';
import { BookDocument } from './schemas/book.schema';
import { ParamId } from './interfaces/param_id';
import { AuthGuard } from '@nestjs/passport';

@Controller('/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  getAll(): Promise<BookDocument[]> {
    return this.service.getAll();
  }

  @UsePipes(new JoiValidationPipe(BookSchema))
  @Post()
  public create(@Body() body: BookCreateDto): Promise<BookDocument>
  {
    return this.service.create(body);
  }

  @UsePipes(new JoiValidationPipe(BookSchema))
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