import { Module } from '@nestjs/common';
import { BookTagService } from './book-tag.service';
import { BookTagController } from './book-tag.controller';
import { PrismaService } from '../../../prisma.service';

@Module({
  controllers: [BookTagController],
  providers: [BookTagService, PrismaService],
})
export class BookTagModule {}
