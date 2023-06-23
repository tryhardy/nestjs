import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';
import { BookModel } from './models/book.model';
import { BookStub } from './stubs/book.stub';

describe('BooksService', () => {
  let service: BooksService;
  let model: BookModel

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: BookModel
        }
      ],
    }).compile(); 

    service = app.get<BooksService>(BooksService);
    model = app.get<BookModel>(getModelToken(Book.name));
    jest.clearAllMocks();
  });

  
  describe('BooksService', () => {
    
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('method "getAll" should be defined', async () => {
      expect(service.getAll).toBeDefined();
    });

    it('method "create" should be defined', async () => {
      expect(service.create).toBeDefined();
    });

    it('method "update" should be defined', async () => {
      expect(service.update).toBeDefined();
    });

    it('method "delete" should be defined', async () => {
      expect(service.delete).toBeDefined();
    });

    it('method "getAll" should return a Books array', async () => {
      let books = await service.getAll();
      expect(service.getAll()).toEqual([BookStub(), BookStub()])
    });

    it('method "create" should return a Book', async () => {
      let book = await service.create(BookStub());
      expect(book).toEqual(BookStub())
    });

    it('method "update" should return a Book', async () => {
      let id = '123';
      let book = await service.update(id, BookStub());
      expect(book).toEqual(BookStub())
    });

    it('method "delete" should return a Book', async () => {
      let id = '123';
      let book = await service.delete(id);
      expect(book).toEqual(BookStub())
    });
  
  });
});

