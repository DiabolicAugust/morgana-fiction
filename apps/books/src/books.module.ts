import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BOOK_SERVICE, JwtStrategy, RMQModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USER_SERVICE } from '@app/common';
import { PrismaService } from '../../../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { S3Service } from '@app/common';
import { BookCoverModule } from '../book-cover/book-cover.module';
import { GenreModule } from '../genre/genre.module';
import { TagModule } from '../tag/tag.module';
import { BookGenreModule } from './books/book-genre/book-genre.module';
import { BookTagModule } from './books/book-tag/book-tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RMQModule.register({
      name: USER_SERVICE,
    }),
    RMQModule.register({
      name: BOOK_SERVICE,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    BookCoverModule,
    GenreModule,
    TagModule,
    BookGenreModule,
    BookTagModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, PrismaService, JwtStrategy, S3Service],
})
export class BooksModule {}
