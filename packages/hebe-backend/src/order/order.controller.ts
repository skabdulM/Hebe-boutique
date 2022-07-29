import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser, Roles } from '../auth/decorator';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { OrderDto, OrderStatusDto } from './dto';
import { OrderService } from './order.service';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  order(@GetUser('id') userId: string, @Body() dto: OrderDto) {
    return this.orderService.order(userId, dto);
  }

  @Roles('MANAGER','ADMIN')
  @UseGuards(RolesGuard)
  @Patch('update/:id')
  updateorderStatus(
    @Param('id') orderId: string,
    @Body() dto: OrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, dto);
  }

  @Get('myorders')
  getuserOrders(@GetUser('id') userId: string) {
    return this.orderService.getuserOrders(userId);
  }
  
  @Roles('MANAGER','ADMIN')
  @UseGuards(RolesGuard)
  @Get('allOrders')
  getallorders() {
    return this.orderService.getallOrders();
  }

  @Get(':id')
  getOrderbyid(
    @GetUser('id') userId: string,
    @Param('id') orderId: string,
  ) {
    return this.orderService.getOrderbyId(userId, orderId);
  }
}
