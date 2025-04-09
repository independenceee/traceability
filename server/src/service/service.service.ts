import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ServiceService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.ServicePlanCreateInput) {
        return this.prisma.servicePlan.create({
            data,
        });
    }

    update(id: string, data: Prisma.ServicePlanUpdateInput) {
        return this.prisma.servicePlan.update({
            where: { id },
            data,
        });
    }

    findAll() {
        return this.prisma.servicePlan.findMany();
    }

    delete(id: string) {
        return this.prisma.servicePlan.delete({
            where: { id },
        });
    }

    findOne(id: string) {
        return this.prisma.servicePlan.findUnique({
            where: { id },
        });
    }
}
