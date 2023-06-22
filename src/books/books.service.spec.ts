import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Book, BookDocument, BookSchema } from './schemas/book.schema';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { BooksModule } from './books.module';

const BookModel = {
  title: 'test',
  description: 'test',
  authors: 'test'
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: BookSchema,
        },
      ],
      exports: [BooksService]
    }).compile(); 

    service = await app.get<BooksService>(BooksService);
  });

  describe('books', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
