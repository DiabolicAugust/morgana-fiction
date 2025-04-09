import { IsNotEmpty, IsString } from 'class-validator';
import { StrongPassword } from '@app/common';

export class UpdatePasswordDto {
  @StrongPassword()
  oldPassword: string;

  @StrongPassword()
  newPassword: string;
}
