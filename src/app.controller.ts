import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from "./pipes/validation.pipe";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test/:code')
  getTest(@Param('code', ValidationPipe) code: string): string {
    return code;
  }
}