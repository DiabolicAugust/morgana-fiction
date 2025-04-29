import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookTagService } from './book-tag.service';

@Controller('book-tag')
export class BookTagController {
  constructor(private readonly bookTagService: BookTagService) {}

  // @Post()
  // create(@Body() createBookTagDto: CreateBookTagDto) {
  //   return this.bookTagService.create(createBookTagDto);
  // }

  @Get()
  findAll() {
    return this.bookTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookTagService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookTagDto: UpdateBookTagDto) {
  //   return this.bookTagService.update(id, updateBookTagDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookTagService.remove(id);
  }
}
