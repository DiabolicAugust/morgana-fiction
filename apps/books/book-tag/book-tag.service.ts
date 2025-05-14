import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class BookTagService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createBookTagDto: CreateBookTagDto) {
  //   return 'This action adds a new bookTag';
  // }

  findAll() {
    return `This action returns all bookTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookTag`;
  }

  // update(id: number, updateBookTagDto: UpdateBookTagDto) {
  //   return `This action updates a #${id} bookTag`;
  // }

  remove(id: string) {
    return this.prisma.bookTag.delete({
      where: {
        id,
      },
    });
  }
}
