import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class BookGenreService {
  constructor(private readonly prisma: PrismaService) {}
  // create(createBookGenreDto: CreateBookGenreDto) {
  //   return 'This action adds a new bookGenre';
  // }

  findAll() {
    return `This action returns all bookGenre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookGenre`;
  }

  // update(id: number, updateBookGenreDto: UpdateBookGenreDto) {
  //   return `This action updates a #${id} bookGenre`;
  // }

  async remove(id: string) {
    return this.prisma.bookGenre.delete({
      where: {
        id,
      },
    });
  }
}
