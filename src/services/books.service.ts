import { Injectable } from '@nestjs/common';
import { Book as BookInterface } from 'src/interfaces/book';

@Injectable()
export class BooksService {

  get(): BookInterface[] {
    return [
      {
        id: 1,
        name: 'Книга 1',
        authors: 'Иван Иванов',
        description: 'Описание к книге 1'
      },
      {
        id: 2,
        name: 'Книга 2',
        authors: 'Анна Шарова',
        description: 'Описание к книге 2'
      },
      {
        id: 3,
        name: 'Книга 3',
        authors: 'Сергей Петров',
        description: 'Описание к книге 3'
      }
    ];
  }
}
