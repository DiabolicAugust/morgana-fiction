import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChapterDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
