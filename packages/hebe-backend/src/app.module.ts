import { Module } from '@nestjs/common';
import { Authmodule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CartProductModule } from './cart-product/cart-product.module';

@Module({
  imports: [
    Authmodule,
    UserModule,
    ProductModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CartProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
