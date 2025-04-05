import { NestFactory } from '@nestjs/core';
import { BooksModule } from './books.module';
import { RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BooksModule);
  const rmqService = app.get<RMQService>(RMQService);
  app.connectMicroservice(rmqService.getOptions('BOOKS'));
  await app.startAllMicroservices();
}
bootstrap();
