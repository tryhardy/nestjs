import { Injectable } from '@nestjs/common';
import { Model, Connection, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { InjectModel, InjectConnection} from '@nestjs/mongoose'

import { Book as BookInterface } from './interfaces/book';
import { Book, BookDocument } from './schemas/book.schema';
import { BookCreateDto } from './interfaces/dto/book.create';

@Injectable()
export class BooksService 
{
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>
  ) {}

  getAll(): Promise<BookDocument[]> 
  {
    return this.bookModel.find().exec();
  }

  create(data: BookCreateDto): Promise<BookDocument> 
  {
    const book = new this.bookModel(data);

    return book.save();
  }

  update(id: string, data: BookCreateDto): Promise<BookDocument>
  {
    return this.bookModel.findOneAndUpdate(
        { _id: id },
        data,
    );
  }

  delete(id: string): Promise<BookDocument> 
  {
    return this.bookModel.findOneAndRemove({ _id: id });
  }
}
