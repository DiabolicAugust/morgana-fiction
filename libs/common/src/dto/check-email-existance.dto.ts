import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckEmailExistanceDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
