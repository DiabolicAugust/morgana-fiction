import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../../../prisma.service';
import { Entities, Fields, Strings } from '@app/common';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTagDto: CreateTagDto) {
    const checkTagExistance = await this.prisma.tag.findFirst({
      where: {
        name: createTagDto.name,
      },
    });
    if (checkTagExistance)
      throw new HttpException(
        Strings.entityWithFieldAlreadyExists(Entities.TAG, Fields.NAME),
        HttpStatus.BAD_REQUEST,
      );

    const tag = await this.prisma.tag.create({
      data: {
        name: createTagDto.name,
      },
    });
    return tag;
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const updatedTag = await this.prisma.tag.update({
      where: { id },
      data: { name: updateTagDto.name },
    });
    return updatedTag;
  }

  remove(id: string) {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
