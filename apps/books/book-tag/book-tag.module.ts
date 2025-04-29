import { Module } from '@nestjs/common';
import { BookTagService } from './book-tag.service';
import { BookTagController } from './book-tag.controller';

@Module({
  controllers: [BookTagController],
  providers: [BookTagService],
})
export class BookTagModule {}
