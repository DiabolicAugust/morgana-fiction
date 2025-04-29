import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { lastValueFrom } from 'rxjs';
import {
  BOOK_SERVICE,
  CREATE_BOOK_COVER,
  Entities,
  GET_USER_BY_IDENTIFIER,
  S3Service,
  Strings,
  USER_SERVICE,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '../../../prisma.service';
import { AuthorRole, User } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(
    @Inject(USER_SERVICE) private userClient: ClientProxy,
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}
  async create(
    data: CreateBookDto,
    userId: string,
    cover?: Express.Multer.File,
  ) {
    const user: User = await lastValueFrom(
      this.userClient.send(GET_USER_BY_IDENTIFIER, userId),
    );

    if (!user)
      throw new HttpException(
        Strings.entityWasNotFoundById(Entities.USER, userId),
        HttpStatus.NOT_FOUND,
      );
    let coverUrl: string | undefined;
    if (cover) {
      coverUrl = await this.s3Service.uploadFile(cover);
    }

    const book = await this.prisma.book.create({
      data: {
        ...data,
        authors: {
          create: {
            author: { connect: { id: user.id } },
            role: AuthorRole.PRIMARY,
          },
        },
        tags: {
          create: data.tagIds.map((tagId) => ({
            tag: { connect: { id: tagId } },
          })),
        },
        genres: {
          create: data.genreIds.map((genreId) => ({
            genre: { connect: { id: genreId } },
          })),
        },
        ...(coverUrl
          ? {
              cover: {
                create: { cover: coverUrl },
              },
            }
          : {}),
      },
      include: {
        authors: { include: { author: true } },
        cover: true,
      },
    });

    return book;
  }
  //TODO: add book update, delete

  async getBooks() {
    return this.prisma.book.findMany();
  }
}
