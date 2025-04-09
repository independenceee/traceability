import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ServiceService } from "./service.service";

@Controller("service")
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) {}

    @Post()
    create(@Body() data: Prisma.ServicePlanCreateInput) {
        return this.serviceService.create(data);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() data: Prisma.ServicePlanUpdateInput) {
        return this.serviceService.update(id, data);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.serviceService.delete(id);
    }

    @Get()
    findAll() {
        return this.serviceService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.serviceService.findOne(id);
    }
}
