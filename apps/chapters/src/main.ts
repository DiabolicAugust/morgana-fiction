import { NestFactory } from '@nestjs/core';
import { ChaptersModule } from './chapters.module';
import { AllExceptionsFilter, RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ChaptersModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  const rmqService = app.get<RMQService>(RMQService);
  app.connectMicroservice(rmqService.getOptions('CHAPTERS'));
  await app.startAllMicroservices();
  const port = process.env.CHAPTERS_PORT
    ? parseInt(process.env.CHAPTERS_PORT, 10)
    : 3004;
  await app.listen(port);
}
bootstrap();
