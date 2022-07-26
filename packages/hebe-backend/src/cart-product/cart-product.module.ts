import { Module } from '@nestjs/common';
import { CartProductController } from './cart-product.controller';
import { CartProductService } from './cart-product.service';

@Module({
  controllers: [CartProductController],
  providers: [CartProductService]
})
export class CartProductModule {}
