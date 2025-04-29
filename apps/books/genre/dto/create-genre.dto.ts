import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Strings } from '@app/common';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: Strings.genreNameValidation })
  name: string;
}
