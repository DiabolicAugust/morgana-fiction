import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(data: CreatePaymentDto) {
    const payment = await this.prisma.payment.create({
      data,
    });
    return payment;
  }
}
