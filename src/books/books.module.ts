import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { BooksController } from './books.controller';
import { BooksService } from './services/books.service';
import { Book, BookSchema } from './schemas/book.schema';
import { BooksCommentsService } from './services/books.comments.service';
import { BookComment, BookCommentSchema } from './schemas/bookcomment.schema';
import { BooksGateway } from './books.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BookComment.name,
        schema: BookCommentSchema
      },
      {
        name: Book.name,
        schema: BookSchema
      },
    ])
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    BooksCommentsService,
    BooksGateway
  ],
  exports:[BooksService, BooksCommentsService]
})
export class BooksModule {
  
}
