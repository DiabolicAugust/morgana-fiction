import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../../../../prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  // create(createProfileDto: CreateProfileDto) {
  //   return 'This action adds a new profile';
  // }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: string) {
    return `This action returns a #${id} profile`;
  }

  async update(requestorId: string, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: {
        userId: requestorId,
      },
      data: updateProfileDto,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
