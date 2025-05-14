import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { StrongPassword, StrongUsername } from '@app/common';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @StrongPassword()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @StrongUsername()
  username: string;
}
