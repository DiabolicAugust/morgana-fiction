import { Module } from '@nestjs/common';
import { BookGenreService } from './book-genre.service';
import { BookGenreController } from './book-genre.controller';
import { PrismaService } from '../../../prisma.service';

@Module({
  controllers: [BookGenreController],
  providers: [BookGenreService, PrismaService],
})
export class BookGenreModule {}
