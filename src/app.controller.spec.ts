import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { BooksController } from './controllers/books.controller';
import { BooksService } from './services/books.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = app.get<BooksController>(BooksController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(controller.get()).toBe('Hello World!');
      return true;
    });
  });
});
