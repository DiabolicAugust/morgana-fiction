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
import { CreateUserDto, GET_USER_BY_IDENTIFIER } from '@app/common';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CREATE_USER_PATTERN } from '@app/common';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(CREATE_USER_PATTERN)
  // @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Payload() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  getUsers() {
    return this.usersService.get();
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.getUser(id);
  }

  @Post('/:id/update-password')
  @UsePipes(ValidationPipe)
  updatePassword(@Param('id') userId: string, @Body() data: UpdatePasswordDto) {
    return this.usersService.updateUserPassword(userId, data);
  }

  @MessagePattern(GET_USER_BY_IDENTIFIER)
  getUserByIdentifier(@Payload() identifier: string) {
    return this.usersService.getUserByIdentifier(identifier);
  }
}
