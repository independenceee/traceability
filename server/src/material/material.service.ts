import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMaterialDto) {
    return this.prisma.material.create({ data });
  }

  async findAll() {
    return this.prisma.material.findMany({
      include: { supplier: true }, // lấy thông tin nhà cung cấp
    });
  }

  async findOne(id: string) {
    return this.prisma.material.findUnique({ where: { id } });
  }

  async remove(id: string) {
    return this.prisma.material.delete({ where: { id } });
  }
}
