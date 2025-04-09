import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';

@Module({
  providers: [SupplierService],
  controllers: [SupplierController]
})
export class SupplierModule {}
