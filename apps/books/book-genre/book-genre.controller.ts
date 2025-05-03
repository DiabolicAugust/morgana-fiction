import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookGenreService } from './book-genre.service';

@Controller('book-genre')
export class BookGenreController {
  constructor(private readonly bookGenreService: BookGenreService) {}

  // @Post()
  // create(@Body() createBookGenreDto: CreateBookGenreDto) {
  //   return this.bookGenreService.create(createBookGenreDto);
  // }

  @Get()
  findAll() {
    return this.bookGenreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookGenreService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookGenreDto: UpdateBookGenreDto) {
  //   return this.bookGenreService.update(+id, updateBookGenreDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookGenreService.remove(id);
  }
}
