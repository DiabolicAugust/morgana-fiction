import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CheckEmailExistanceDto } from '@app/common';

@Injectable()
export class EmailService {
  constructor(private readonly prisma: PrismaService) {}
  async checkEmailExistance(data: CheckEmailExistanceDto): Promise<boolean> {
    console.log('start email');

    const email = await this.prisma.email.findFirst({
      where: {
        email: data.email,
      },
    });
    return !!email;
  }
}
