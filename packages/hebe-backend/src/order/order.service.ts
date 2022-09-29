import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto, OrderStatusDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async order(userId: string, dto: OrderDto) {
    let products: any = [];
    let temp: any = 0;
    let temp2: any = 0;
    let totalAmount;

    for (let element of dto.products) {
      await this.prisma.products
        .findUniqueOrThrow({
          where: {
            id: element.productId,
          },
          include: {
            variations: true,
          },
        })
        .then(async (data) => {
          const productDiscount: number = data.productDiscount;
          const productPrice: any = data.productPrice;
          temp = (
            (productPrice - (productPrice * productDiscount) / 100) *
            element.productQuantity
          ).toFixed(2);
          const productAmount: number = parseFloat(temp);
          if (
            data.variations.find(
              (variation) =>
                variation.id == element.productVariationId,
            )
          ) {
            await this.prisma.productVariations
              .findUniqueOrThrow({
                where: { id: element.productVariationId },
              })
              .then((data) => {
                products.push({
                  productId: element.productId,
                  variationId: element.productVariationId,
                  size: data.productSize,
                  color: data.productColor,
                  productQuantity: element.productQuantity,
                  productPrice: productPrice,
                  productDiscount: productDiscount,
                  productAmount: productAmount,
                });
                temp2 += productAmount;
                if (
                  data.productQuantity <= 0 ||
                  data.productQuantity < element.productQuantity
                ) {
                  throw new BadRequestException('Out Of stock');
                }
              });
            // .catch((error) => {
            //   if (error.message == 'Out Of stock') {
            //     throw new BadRequestException('Out Of stock');
            //   }
            //   // throw new NotFoundException(error);
            // });
          } else {
            throw NotFoundException;
          }
        })
        .catch((error) => {
          if (error.message == 'Out Of stock') {
            throw new BadRequestException('Out Of stock');
          } else {
            throw new NotFoundException('Not found', error);
          }
        });

      await this.prisma.productVariations
        .update({
          where: {
            id: element.productVariationId,
          },
          data: {
            productQuantity: {
              decrement: element.productQuantity,
            },
          },
        })
        .catch((error) => {
          throw new NotAcceptableException(error);
        });
    }

    totalAmount = temp2.toFixed(2);
    totalAmount = parseFloat(totalAmount);

    const order = await this.prisma.orders
      .create({
        data: {
          userId: userId,
          name: dto.name,
          products: products,
          shippingAddress: dto.shippingAddress,
          phone: dto.phone,
          phone2: dto.phone2,
          totalAmount: totalAmount,
          paynmentId: dto.paymentId,
          product: {
            connect: dto.products.map((element) => ({
              id: element.productVariationId,
            })),
          },
        },
      })
      .catch((error) => {
        throw new NotFoundException('Not Found', error);
      });

    return order;
  }

  async updateOrderStatus(orderId: string, dto: OrderStatusDto) {
    return this.prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        status: dto.status,
      },
    });
  }

  getuserOrders(userId: string) {
    return this.prisma.orders.findMany({
      where: {
        userId,
      },
    });
  }

  getallOrders() {
    return this.prisma.orders.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  getOrderbyId(userId: string, orderId: string) {
    return this.prisma.orders.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });
  }
}
/*
    const order = await this.prisma.orders.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order || order.userId !== userId)
      throw new ForbiddenException('Access to resources denied');
*/
