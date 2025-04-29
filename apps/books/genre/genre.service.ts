import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from '../../../prisma.service';
import { Entities, Fields, Strings } from '@app/common';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createGenreDto: CreateGenreDto) {
    const checkGenreExistance = await this.prisma.genre.findFirst({
      where: {
        name: createGenreDto.name,
      },
    });
    if (checkGenreExistance)
      throw new HttpException(
        Strings.entityWithFieldAlreadyExists(Entities.GENRE, Fields.NAME),
        HttpStatus.BAD_REQUEST,
      );

    const genre = await this.prisma.genre.create({
      data: {
        name: createGenreDto.name,
      },
    });
    return genre;
  }

  findAll() {
    return `This action returns all genre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const updatedGenre = await this.prisma.genre.update({
      where: { id },
      data: { name: updateGenreDto.name },
    });
    return updatedGenre;
  }

  remove(id: string) {
    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
