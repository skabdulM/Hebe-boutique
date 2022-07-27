import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { OrderDto } from './dto';
import { OrderStatusDto } from './dto/orderStatus.dto';
import { OrderService } from './order.service';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  order(@GetUser('id') userId: string, @Body() dto: OrderDto) {
    return this.orderService.order(userId, dto);
  }

  @Patch('update/:id')
  editCartProductsbyid(
    @GetUser('id') userId: string,
    @Param('id') orderId: string,
    @Body() dto: OrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(userId, orderId, dto);
  }

  @Get('allorders')
  getCartProducts(@GetUser('id') userId: string) {
    return this.orderService.allOrders(userId);
  }

  @Get(':id')
  getCartProductsbyId(
    @GetUser('id') userId: string,
    @Param('id') orderId: string,
  ) {
    return this.orderService.getOrderbyId(userId, orderId);
  }
}
