import { Module } from '@nestjs/common';
import { BookGenreService } from './book-genre.service';
import { BookGenreController } from './book-genre.controller';

@Module({
  controllers: [BookGenreController],
  providers: [BookGenreService],
})
export class BookGenreModule {}
