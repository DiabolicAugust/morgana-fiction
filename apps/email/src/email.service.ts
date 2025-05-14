import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CheckEmailExistanceDto } from '@app/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EmailService {
  constructor(private readonly prisma: PrismaService) {}
  async checkEmailExistance(data: CheckEmailExistanceDto): Promise<boolean> {
    console.log('start email');

    // const dto = plainToClass(CheckEmailExistanceDto, data);
    // const errors = await validate(dto);
    // console.log('email existance errors: ', errors);

    // if (errors.length > 0) throw new BadRequestException(errors);

    const email = await this.prisma.email.findFirst({
      where: {
        email: data.email.toLowerCase(),
      },
    });
    return !!email;
  }
}
