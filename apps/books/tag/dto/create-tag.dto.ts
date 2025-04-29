import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Strings } from '@app/common';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: Strings.tagNameValidation })
  name: string;
}
