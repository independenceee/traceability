import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Service kết nối Prisma
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSupplierDto) {
    return this.prisma.supplier.create({ data });
  }

  async findAll(userId: string, page = 1, limit = 9) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.supplier.findMany({
        where: {
          userId: userId,
        },
        skip,
        take: limit,
        include: {
          user: true,
          Material: true,
        },
      }),
      this.prisma.supplier.count({
        where: {
          userId: userId,
        },
      }),
    ]);
  
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return this.prisma.supplier.findUnique({ where: { id } });
  }

  async remove(id: string) {
    return this.prisma.supplier.delete({ where: { id } });
  }
}
