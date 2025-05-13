import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { lastValueFrom } from 'rxjs';
import { CHAPTER_SERVICE, CHECK_BOOK_AUTHOR } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { Book } from '@prisma/client';
import { UpdateChapterDto } from '../dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CHAPTER_SERVICE) private chapterClient: ClientProxy,
  ) {}

  async create(
    createChapterDto: CreateChapterDto,
    requestorId: string,
    bookId: string,
  ) {
    await this.checkRequestorIsAuthor(requestorId, bookId);

    const chapter = await this.prisma.chapter.create({
      data: {
        text: createChapterDto.text,
        price: createChapterDto.price,
        bookId: bookId,
      },
    });

    return chapter;
  }

  async getById(id: string) {
    return this.prisma.chapter.findUnique({
      where: {
        id,
      },
    });
  }

  async getByBook(bookId: string) {
    return this.prisma.chapter.findMany({
      where: {
        bookId,
      },
    });
  }

  async update(
    data: UpdateChapterDto,
    id: string,
    requestorId: string,
    bookId: string,
  ) {
    await this.checkRequestorIsAuthor(requestorId, bookId);
    return this.prisma.chapter.update({
      where: { id },
      data: data,
    });
  }

  //TODO: add removement after payment functionality is added

  private async checkRequestorIsAuthor(requestorId: string, bookId: string) {
    const payload = {
      requestorId: requestorId,
      bookId: bookId,
    };
    const isRequestorAuthor: boolean = await lastValueFrom(
      this.chapterClient.send(CHECK_BOOK_AUTHOR, payload),
    );

    if (!isRequestorAuthor) throw new UnauthorizedException();
  }
}
