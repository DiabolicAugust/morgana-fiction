import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@app/common';
import { AllExceptionsFilter } from '@app/common';
import { SignInDto } from '../dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(new ValidationPipe({ transform: true }))
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }

  @Post('/sign-in')
  @UsePipes(new ValidationPipe({ transform: true }))
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }
}
