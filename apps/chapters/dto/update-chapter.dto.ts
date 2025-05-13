import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChapterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
