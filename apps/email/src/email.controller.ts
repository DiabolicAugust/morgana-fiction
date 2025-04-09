import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern } from '@nestjs/microservices';
import { CheckEmailExistanceDto } from '@app/common';
import { CHECK_EMAIL_EXISTANCE_PATTERN } from '@app/common';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern(CHECK_EMAIL_EXISTANCE_PATTERN)
  @UsePipes(ValidationPipe)
  checkEmailExistance(data: CheckEmailExistanceDto) {
    console.log('start controller');
    return this.emailService.checkEmailExistance(data);
  }
}
