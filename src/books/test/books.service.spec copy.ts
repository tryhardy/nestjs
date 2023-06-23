import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';
import { BookStub } from './stubs/book.stub';
import { Book } from '../schemas/book.schema';
import { BookCreateDto } from '../interfaces/dto/book.create';

jest.mock('../books.service');

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
      ],
    }).compile(); 

    service = await app.resolve<BooksService>(BooksService);
    jest.clearAllMocks();
  });

  
  describe('BooksService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('Method should return Book', () => {
      let book = {
        title: "Тестовое название книги",
        description: "Тестовwweqeqwewwwое описание книги",
        authors: "Иванов И.В."
      };

      expect(service.create(book)).toEqual(BookStub());
    });
  });


  // describe('BooksService update', () => {
  //   let book: Book;
  //   let bookUpdateDto: BookCreateDto;

  //   beforeEach(async () => {
  //     bookUpdateDto = {
  //       title: "Какой-то заголовок",
  //       authors: "Какой-то автор",
  //       description: "Какое-то описание"
  //     };

  //     book = await service.create(bookUpdateDto);
  //   })

  //   it('Method should be defined', () => {
  //     expect(service.create).toBeDefined();
  //   });

  //   it('Method should return Book', () => {
  //     expect(book).toEqual(BookStub());
  //   });

  // });
});

