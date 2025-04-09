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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  // @UseFilters(AllExceptionsFilter)
  @UsePipes(ValidationPipe)
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }
}
