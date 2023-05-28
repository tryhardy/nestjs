import { NestFactory } from '@nestjs/core';
import { BooksModule } from './modules/books.module';

async function bootstrap() {
  const app = await NestFactory.create(BooksModule);
  await app.listen(3000);
}
bootstrap();
