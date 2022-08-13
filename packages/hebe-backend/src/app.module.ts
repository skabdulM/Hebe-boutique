import { Module } from '@nestjs/common';
import { Authmodule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { CartModule } from './cart/cart.module';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

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
    CommentModule,
  ],
  controllers: [OrderController, CommentController],
  providers: [OrderService, CommentService],
})
export class AppModule {}
