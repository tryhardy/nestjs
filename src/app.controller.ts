import { Controller, Get, Param, Render, UseGuards, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from "./validation.pipe";
import { AuthGuard } from './auth/auth.guard';

//@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root()
  {
    return {
      title: this.appService.getHello()
    };
  }

  @Get('test/:code')
  getTest(@Param('code', ValidationPipe) code: string): string {
    return code;
  }
}