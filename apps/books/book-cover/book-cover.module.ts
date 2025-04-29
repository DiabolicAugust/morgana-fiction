import { Module } from '@nestjs/common';
import { BookCoverService } from './book-cover.service';
import { BookCoverController } from './book-cover.controller';
import { S3Service } from '@app/common';
import { PrismaService } from '../../../prisma.service';

@Module({
  controllers: [BookCoverController],
  providers: [BookCoverService, S3Service, PrismaService],
})
export class BookCoverModule {}
