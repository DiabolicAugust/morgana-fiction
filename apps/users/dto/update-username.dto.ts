import { IsNotEmpty, IsString } from 'class-validator';
import { StrongUsername } from '@app/common';

export class UpdateUsernameDto {
  @StrongUsername()
  newUsername: string;
}
