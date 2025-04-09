import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RMQService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck: boolean = false): RmqOptions {
    const uri = this.configService.get<string>('RABBIT_MQ_URI');
    console.log(uri);
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`${uri}?heartbeat=60`],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
        // socketOptions: {
        //   heartbeat: 60,
        // },
      },
    };
  }
}
