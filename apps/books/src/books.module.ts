import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { RMQModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { USER_SERVICE } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RMQModule.register({
      name: USER_SERVICE,
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
