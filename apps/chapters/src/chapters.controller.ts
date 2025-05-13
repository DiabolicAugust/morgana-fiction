import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { JwtAuthGuard, PayloadDto } from '@app/common';
import { UpdateChapterDto } from '../dto/update-chapter.dto';

@Controller('book/:bookId/chapter')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(
    @Body() createChapterDto: CreateChapterDto,
    @Request() req: Request,
    @Param('bookId') bookId: string,
  ) {
    const user: PayloadDto = req['user'];
    return this.chaptersService.create(createChapterDto, user.id, bookId);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.chaptersService.getById(id);
  }

  @Get('')
  getByBook(@Param('bookId') bookId: string) {
    return this.chaptersService.getByBook(bookId);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  update(
    @Body() data: UpdateChapterDto,
    @Request() req: Request,
    @Param('id') id: string,
    @Param('bookId') bookId: string,
  ) {
    const user: PayloadDto = req['user'];
    return this.chaptersService.update(data, id, user.id, bookId);
  }
}
