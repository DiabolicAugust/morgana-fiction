import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../../../libs/common/src';
import { CreateBookDto } from '../dto/create-book.dto';
import { PayloadDto } from '@app/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new Error('Only JPG/PNG allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() data: CreateBookDto,
    @Request() req: Request,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const userId: PayloadDto = req['user'];
    return this.booksService.create(data, userId.id, file);
  }

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }
}
