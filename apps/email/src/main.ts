import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  const rmqService = app.get<RMQService>(RMQService);
  app.connectMicroservice(rmqService.getOptions('EMAILS'));
  await app.startAllMicroservices();
  const port = process.env.EMAIL_PORT
    ? parseInt(process.env.EMAIL_PORT, 10)
    : 3000;
  await app.listen(port);
}
bootstrap();
