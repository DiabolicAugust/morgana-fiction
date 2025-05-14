import { Module } from '@nestjs/common';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';
import { PrismaService } from '../../../prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BOOK_SERVICE, JwtStrategy, RMQModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    RMQModule.register({ name: BOOK_SERVICE }),
  ],
  controllers: [ChaptersController],
  providers: [ChaptersService, PrismaService, JwtStrategy],
})
export class ChaptersModule {}
