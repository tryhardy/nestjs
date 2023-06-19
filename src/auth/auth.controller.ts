import { Controller, Get, Post, Param, UsePipes, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserSchema } from '../users/validation/schemas/user.schema';
import { JoiUserValidationPipe } from '../users/validation/joi.user.validation.pipe';
import { UserCreateDto } from '../users/interfaces/dto/user.create';
import { User, UserDocument } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';
import { UserValidateDto } from '../users/interfaces/dto/user.validate';

@Controller("/api")
export class AuthController {
  constructor(private readonly auth: AuthService, private user: UsersService) {}

  @UsePipes(new JoiUserValidationPipe(UserSchema))
  @Post('/users/signup')
  signup(@Body() body: UserCreateDto): Promise<UserDocument> 
  {
    return this.user.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/users/signin')
  signin(@Body() params: UserValidateDto): Promise<any> 
  {
    return this.auth.validateUser(params.email, params.password);
  }
}