import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';
import { HttpExceptionFilter } from "./http.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor);
  app.useGlobalFilters(new HttpExceptionFilter);
  await app.listen(process.env.PORT);
}
bootstrap();
