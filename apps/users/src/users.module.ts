import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../../../prisma.service';
import { EMAIL_SERVICE, RMQModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptionService } from '../../../libs/common/src/services/encryption.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   RABBIT_MQ_URI: Joi.string().required(),
      // }),
    }),
    RMQModule.register({ name: EMAIL_SERVICE }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, EncryptionService],
})
export class UsersModule {}
