import { Module } from "@nestjs/common";
import { AssetsModule } from "./assets/assets.module";
import { BlockfrostModule } from "./blockfrost/blockfrost.module";
import { KoiosModule } from "./koios/koios.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { StatisticModule } from "./statistic/statistic.module";
import { ContractModule } from "./contract/contract.module";
import { ServiceModule } from "./service/service.module";
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionModule } from './subscription/subscription.module';
import { CertificationModule } from './certification/certification.module';
import { CollectionModule } from './collection/collection.module';
import { DocumentModule } from './document/document.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MediaModule } from './media/media.module';
import { MetadataModule } from './metadata/metadata.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { WalletNonceModule } from './wallet-nonce/wallet-nonce.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { MaterialModule } from './material/material.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AssetsModule,
        BlockfrostModule,
        KoiosModule,
        PrismaModule,
        StatisticModule,
        ContractModule,
        ServiceModule,
        UserModule,
        PaymentModule,
        SubscriptionModule,
        CertificationModule,
        CollectionModule,
        DocumentModule,
        FeedbackModule,
        MediaModule,
        MetadataModule,
        ProductModule,
        SupplierModule,
        WalletNonceModule,
        WarehouseModule,
        MaterialModule,
    ],
    providers: [SubscriptionService],
})
export class AppModule {}
