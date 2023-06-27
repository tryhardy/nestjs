import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';

import { BooksService } from '../services/books.service';
import { BookStub } from './stubs/book.stub';
import { BooksController } from '../books.controller';

describe('BooksController (e2e)', () => {
  let id = '123456';
  let app: INestApplication;
  let booksService = {
    getAll: jest.fn().mockReturnValue([BookStub()]),
    create: jest.fn().mockReturnValue(BookStub()),
    update: jest.fn().mockReturnValue(BookStub()),
    delete: jest.fn().mockReturnValue(BookStub()),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
      ],
    })
    .overrideProvider(BooksService)
    .useValue(booksService)
    .compile();

    app = moduleRef.createNestApplication();;
    await app.init();
  });

  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect([BookStub()]);
  });

  it('/books (POST)', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send(BookStub())
      .expect(201)
      .expect(BookStub());
  });

  it('/books/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/books/' + id)
      .expect(200)
      .expect(BookStub());
  });


  it('/books/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put('/books/' + id)
      .send(BookStub())
      .expect(200)
      .expect(BookStub())
  });
});