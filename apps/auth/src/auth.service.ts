import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CREATE_USER_PATTERN, CreateUserDto, USER_SERVICE } from '@app/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(USER_SERVICE) private userClient: ClientProxy,
  ) {}

  async signUp(data: CreateUserDto) {
    const createdUser = await lastValueFrom(
      this.userClient.send(CREATE_USER_PATTERN, data),
    );
    return createdUser;
  }

  async signIn() {}
}
