import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto';
import { OrderStatusDto } from './dto/orderStatus.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async order(userId: string, dto: OrderDto) {
    const order = await this.prisma.orders.create({
      data: {
        userId: userId,
        name: dto.name,
        products: dto.products,
        shippingAddress: dto.shippingAddress,
        phone: dto.totalAmount,
        totalAmount: dto.totalAmount,
        paynmentId: dto.paymentId,
      },
    });
    return order;
  }
  async updateOrderStatus(
    userId: string,
    orderId: string,
    dto: OrderStatusDto,
  ) {
    const order = await this.prisma.orders.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order || order.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        status: dto.status,
      },
    });
  }

  allOrders(userId: string) {
    return this.prisma.orders.findMany({
      where: {
        userId,
      },
    });
  }

  getOrderbyId(userId: string, orderId: string) {
    return this.prisma.orders.findUnique({
      where: {
        id: orderId,
      },
    });
  }
}
