import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}