import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  CHECK_EMAIL_EXISTANCE_PATTERN,
  EMAIL_SERVICE,
  Fields,
  Strings,
  EncryptionService,
  CheckEmailExistanceDto,
  Entities,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UpdateUsernameDto } from '../dto/update-username.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(EMAIL_SERVICE) private emailClient: ClientProxy,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(data: CreateUserDto) {
    console.log('start');

    const existingUser = await this.prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });
    if (existingUser)
      throw new ForbiddenException(
        HttpStatus.FORBIDDEN,
        Strings.fieldMustBeUnique(Fields.USERNAME),
      );

    console.log(existingUser);
    const messagePayload: CheckEmailExistanceDto = {
      email: data.email.toLowerCase(),
    };
    const isEmailExisting = await lastValueFrom(
      this.emailClient.send(CHECK_EMAIL_EXISTANCE_PATTERN, messagePayload),
    );
    console.log(isEmailExisting);
    if (isEmailExisting)
      throw new ForbiddenException(
        HttpStatus.FORBIDDEN,
        Strings.fieldMustBeUnique(Fields.EMAIL),
      );

    const encryptedPassword = await this.encryptionService.hashData(
      data.password,
    );

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        password: encryptedPassword,
        email: {
          create: {
            email: data.email.toLowerCase(),
          },
        },
      },
      include: {
        email: true,
      },
    });

    return user;
  }

  async get() {
    return this.prisma.user.findMany({
      include: {
        email: true,
      },
    });
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user)
      throw new ForbiddenException(
        HttpStatus.FORBIDDEN,
        Strings.fieldMustBeUnique(Fields.ID),
      );
    return user;
  }

  async updateUserPassword(userId: string, data: UpdatePasswordDto) {
    const user = await this.getUser(userId);
    const isRightOldPassword = await this.encryptionService.validateHashedData(
      data.oldPassword,
      user.password,
    );
    if (!isRightOldPassword)
      throw new UnauthorizedException(
        HttpStatus.UNAUTHORIZED,
        Strings.wrongPassword,
      );

    const hashNewPassword = await this.encryptionService.hashData(
      data.newPassword,
    );

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashNewPassword },
    });
    if (!updatedUser)
      throw new HttpException(
        Strings.somethingWentWrong,
        HttpStatus.NOT_MODIFIED,
      );
    return updatedUser;
  }

  async updateUserUsername(userId: string, data: UpdateUsernameDto) {
    const checkNewUsernameUniqness = await this.prisma.user.findUnique({
      where: {
        username: data.newUsername,
      },
    });
    if (checkNewUsernameUniqness)
      throw new HttpException(
        Strings.entityWithFieldAlreadyExists(Entities.USER, Fields.USERNAME),
        HttpStatus.NOT_ACCEPTABLE,
      );

    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: data.newUsername,
      },
    });
    if (!updatedUser)
      throw new HttpException(
        Strings.somethingWentWrong,
        HttpStatus.NOT_MODIFIED,
      );
    return updatedUser;
  }
}
