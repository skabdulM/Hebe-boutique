import { Module } from '@nestjs/common';
import { Authmodule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    Authmodule,
    UserModule,
    ProductModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CartModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
