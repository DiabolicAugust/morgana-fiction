import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase())
  identifier: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
