import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  getUsers() {
    return this.usersService.get();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.getUser(id);
  }

  @Post('/:id/update-password')
  @UsePipes(ValidationPipe)
  updatePassword(@Param('id') userId: string, @Body() data: UpdatePasswordDto) {
    return this.usersService.updateUserPassword(userId, data);
  }
}
