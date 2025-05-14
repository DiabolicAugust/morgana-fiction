import { NestFactory } from '@nestjs/core';
import { BooksModule } from './books.module';
import { RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BooksModule);
  const rmqService = app.get<RMQService>(RMQService);
  app.connectMicroservice(rmqService.getOptions('BOOKS'));
  await app.startAllMicroservices();
  const port = process.env.BOOKS_PORT
    ? parseInt(process.env.BOOKS_PORT, 10)
    : 3000;
  await app.listen(port);
}
bootstrap();
