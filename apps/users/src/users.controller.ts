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
import { CreateUserDto } from '@app/common';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CREATE_USER_PATTERN } from '@app/common';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(CREATE_USER_PATTERN)
  // @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Payload() data: CreateUserDto) {
    console.log('DTO:', data);
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
