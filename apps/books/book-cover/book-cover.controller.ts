import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookCoverService } from './book-cover.service';
import { CreateBookCoverDto } from './dto/create-book-cover.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CREATE_BOOK_COVER } from '@app/common';

@Controller('book-cover')
export class BookCoverController {
  constructor(private readonly bookCoverService: BookCoverService) {}

  @MessagePattern(CREATE_BOOK_COVER)
  @Post()
  create(@Payload() createBookCoverDto: CreateBookCoverDto) {
    return this.bookCoverService.create(createBookCoverDto);
  }

  @Get()
  findAll() {
    return this.bookCoverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookCoverService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookCoverDto: UpdateBookCoverDto) {
  //   return this.bookCoverService.update(+id, updateBookCoverDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookCoverService.remove(+id);
  }
}
