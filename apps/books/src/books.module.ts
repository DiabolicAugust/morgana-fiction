import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { RMQModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RMQModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
