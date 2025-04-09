import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ServiceService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.ServiceCreateInput) {
        return this.prisma.service.create({
            data,
        });
    }

    update(id: string, data: Prisma.ServiceUpdateInput) {
        return this.prisma.service.update({
            where: { id },
            data,
        });
    }

    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.prisma.$transaction([
          this.prisma.supplier.findMany({
            skip,
            take: limit,
            include: {
              user: true,
              Material: true,
            },
          }),
          this.prisma.supplier.count(),
        ]);
      
        return {
          data,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        };
      }

    delete(id: string) {
        return this.prisma.service.delete({
            where: { id },
        });
    }

    findOne(id: string) {
        return this.prisma.service.findUnique({
            where: { id },
        });
    }
}
