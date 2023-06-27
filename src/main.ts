import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';
import { HttpExceptionFilter } from "./http.exception.filter";

async function bootstrap() 
{
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.useGlobalInterceptors(new LoggingInterceptor);
  app.useGlobalFilters(new HttpExceptionFilter);
  
  app.useStaticAssets(join(__dirname, '../src', 'public'));
  app.setBaseViewsDir(join(__dirname, '../src', 'views'));
  app.setViewEngine('ejs');

  await app.listen(process.env.PORT);
}

bootstrap();
