import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const rmqService = app.get<RMQService>(RMQService);
  app.connectMicroservice(rmqService.getOptions('USERS'));
  await app.startAllMicroservices();
  const port = process.env.USERS_PORT
    ? parseInt(process.env.USERS_PORT, 10)
    : 3000;
  await app.listen(port);
}
bootstrap();
