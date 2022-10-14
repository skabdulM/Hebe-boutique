import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCartProductDto } from './dto';
import { EditCartProductDto } from './dto/editCartProduct.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCartProducts(userId: string) {
    return await this.prisma.cart
      .findMany({
        where: {
          userId,
        },
        include: {
          product: {
            include: {
              Products: true,
            },
          },
        },
      })
      .catch((error) => {
        throw new UnauthorizedException();
      });
  }

  getCartProductsbyId(userId: string, cartproductId: number) {
    return this.prisma.cart.findFirst({
      where: {
        id: cartproductId,
        userId,
      },
    });
  }
  /*
      for just addto cart do this
       async addtoCart(userId: string, dto: AddCartProductDto) {
        const product = await this.prisma.cartProducts
          .create({
            data: {
              userId,
              ...dto,
            },
          });
      return product;
    }
    */
  // logic for product already exists in cart
  /*
  async addtoCart(userId: string, dto: AddCartProductDto) {
    const product = await this.prisma.cart
      .create({
        data: {
          userId,
          ...dto,
        },
      });
  return product;
}
*/
  async addtoCart(userId: string, dto: AddCartProductDto) {
    let product: any;

    await this.prisma.productVariations
      .findUniqueOrThrow({
        where: {
          id: dto.id,
        },
      })
      .catch((error) => {
        throw new BadRequestException('product not found');
      });

    await this.prisma.cart
      .findFirst({
        where: {
          product: {
            every: {
              id: dto.id,
            },
          },
          userId,
        },
      })
      .then((data) => {
        product = data;
      })
      .catch((error) => {
        throw error;
      });

    if (!product) {
      await this.prisma.cart
        .create({
          data: {
            userId,
            product: {
              connect: {
                id: dto.id,
              },
            },
          },
        })
        .then((data) => {
          product = data;
        })
        .catch((error) => {
          throw error;
        });
    } else {
      throw new ConflictException('product already exists');
    }
  }

  async editCartProductbyid(
    userId: string,
    cartproductId: number,
    dto: EditCartProductDto,
  ) {
    const product = await this.prisma.cart.findUnique({
      where: {
        id: cartproductId,
      },
    });

    if (!product || product.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.cart.update({
      where: {
        id: cartproductId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCartProductByid(userId: string, cartproductId: number) {
    const product = await this.prisma.cart.findUnique({
      where: {
        id: cartproductId,
      },
    });

    if (!product || product.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.cart.delete({
      where: {
        id: cartproductId,
      },
    });
  }
}
