import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schemas/book.schema';

const BookModel = {
  title: 'test',
  description: 'test',
  authors: 'test'
};

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema
      }
    ])
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
  ],
  exports:[BooksService]
})
export class BooksModule {
  
}
