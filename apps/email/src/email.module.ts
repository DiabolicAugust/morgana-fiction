import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from '@app/common';
import { PrismaService } from '../../../prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RMQModule],
  controllers: [EmailController],
  providers: [EmailService, PrismaService],
})
export class EmailModule {}
