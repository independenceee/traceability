import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { isNil } from 'lodash';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { address } = createUserDto;
    if (isNil(address)) {
      throw new ConflictException('Address is required');
    }
    const user = await this.prisma.user.upsert({
      where: {
        address,
      },
      create: {
        address,
      },
      update: {},
    });

    return {
      id: user.id,
      address: user.address,
    };
  }
}
