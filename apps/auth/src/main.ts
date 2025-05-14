import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { AllExceptionsFilter, RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  const rmqService = app.get<RMQService>(RMQService);
  app.connectMicroservice(rmqService.getOptions('AUTH'));
  await app.startAllMicroservices();
  const port = process.env.AUTH_PORT
    ? parseInt(process.env.AUTH_PORT, 10)
    : 3000;
  await app.listen(port);
}
bootstrap();
