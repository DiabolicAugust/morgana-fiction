import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { StrongPassword, StrongUsername } from '@app/common';

export class CreateUserDto {
  @StrongPassword()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @StrongUsername()
  username: string;
}
