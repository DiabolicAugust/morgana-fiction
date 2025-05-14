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
import { CHECK_BOOK_AUTHOR, JwtAuthGuard } from '@app/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { PayloadDto } from '@app/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MessagePattern, Payload } from '@nestjs/microservices';

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
    const user: PayloadDto = req['user'];
    console.log('user payload: ', user);
    return this.booksService.create(data, user.id, file);
  }

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @MessagePattern(CHECK_BOOK_AUTHOR)
  checkRequestorIsAuthor(
    @Payload() { requestorId, bookId }: { requestorId: string; bookId: string },
  ) {
    return this.booksService.checkRequestorIsAuthor(requestorId, bookId);
  }
}
