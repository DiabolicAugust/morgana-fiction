import { Injectable } from '@nestjs/common';
import { CreateBookCoverDto } from './dto/create-book-cover.dto';
import { S3Service } from '@app/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class BookCoverService {
  constructor(
    private readonly s3Sevice: S3Service,
    private readonly prisma: PrismaService,
  ) {}
  async create(createBookCoverDto: CreateBookCoverDto) {
    const buffer = Buffer.from(createBookCoverDto.data, 'base64');

    const coverFile = {
      originalname: createBookCoverDto.filename,
      mimetype: createBookCoverDto.contentType,
      buffer,
    } as Express.Multer.File;

    const bookCoverURL = await this.s3Sevice.uploadFile(coverFile);
    const bookCover = await this.prisma.bookCover.create({
      data: {
        bookId: createBookCoverDto.bookId,
        cover: bookCoverURL,
      },
    });
    return bookCover;
  }

  findAll() {
    return this.prisma.bookCover.findMany({
      include: {
        book: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} bookCover`;
  }

  update(id: number) {
    return `This action updates a #${id} bookCover`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookCover`;
  }
}
