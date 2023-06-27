import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, UseGuards, Render, Req, Ip, Headers, Query} from '@nestjs/common';

import { BookSchema } from "./validation/schemas/book.schema";
import { JoiValidationPipe } from "./validation/joi.validation.pipe";
import { BooksService } from './services/books.service';
import { BookCreateDto } from './interfaces/dto/book.create';
import { Book, BookDocument } from './schemas/book.schema';
import { ParamId } from './interfaces/param.id';
import { BooksCommentsService } from './services/books.comments.service';
import { BookCommentCreateDto } from './interfaces/dto/book.comment.create';
import { BookComment, BookCommentSchema } from './schemas/bookcomment.schema';

@Controller('/books')
export class BooksController {
  constructor(
    private readonly service: BooksService,
  ) {}

  @Get()
  @Render('books/index')
  async indexHtml()
  {
    let books = await this.service.getAll();

    return {
      title: 'Книги',
      items: books
    }
  }

  @Get(':id')
  @Render('books/view')
  async viewHtml(@Param() { id }: ParamId,)
  {
    let book = await this.service.findById(id);

    return {
      title: 'Книги',
      book: book,
      path: id + '/create',
      bookId: id,
      comments: []
    }
  }

  @Get('/create')
  @Render('books/create')
  createHtml()
  {
    return {
      title: 'Создать книгу',
      book: {},
    }
  }

  @UsePipes(new JoiValidationPipe(BookSchema))
  @Post('/create')
  create(@Body() body: BookCreateDto)
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