import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import {
  CREATE_USER_PATTERN,
  CreateUserDto,
  EncryptionService,
  GET_USER_BY_IDENTIFIER,
  Strings,
  USER_SERVICE,
} from '@app/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { SignInDto } from '../dto/sign-in.dto';
import { TokenService } from '../services/token.service';
import { Email, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(USER_SERVICE) private userClient: ClientProxy,
    private readonly tokenService: TokenService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async signUp(data: CreateUserDto) {
    const createdUser = await lastValueFrom(
      this.userClient.send(CREATE_USER_PATTERN, data),
    );
    return createdUser;
  }

  async signIn(data: SignInDto) {
    console.log(data.identifier, 'wtf');
    const user: User & Email = await lastValueFrom(
      this.userClient.send(GET_USER_BY_IDENTIFIER, data.identifier),
    );
    console.log(user);
    if (!user)
      throw new HttpException(Strings.entityNotFound, HttpStatus.NOT_FOUND);

    const isPasswordCorrect = await this.encryptionService.validateHashedData(
      data.password,
      user.password,
    );
    if (!isPasswordCorrect)
      throw new HttpException(Strings.wrongPassword, HttpStatus.UNAUTHORIZED);

    const token = await this.tokenService.generateToken(user.id, user.email);
    return {
      token: token,
      data: user,
    };
  }
}
