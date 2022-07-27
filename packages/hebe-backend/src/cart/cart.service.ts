import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCartProductDto } from './dto';
import { EditCartProductDto } from './dto/editCartProduct.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  getCartProducts(userId: string) {
    return this.prisma.cart.findMany({
      where: {
        userId,
      },
    });
  }

  getCartProductsbyId(userId: string, productId: number) {
    return this.prisma.cart.findFirst({
      where: {
        id: productId,
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

  async addtoCart(userId: string, dto: AddCartProductDto) {
    let product: AddCartProductDto;
    const af = await this.prisma.cart
      .findFirst({
        where: {
          productId: dto.productId,
          userId,
        },
      })
      .then((data) => {
        product = data;
      })
      .catch((error) => {})
      .finally(() => {});

    if (!product) {
      await this.prisma.cart
        .create({
          data: {
            userId,
            ...dto,
          },
        })
        .then((data) => {
          product = data;
        })
        .catch((error) => {})
        .finally(() => {});
    } else {
      throw new ForbiddenException('product Already exists');
    }
    return product;
  }

  async editCartProductbyid(
    userId: string,
    productId: number,
    dto: EditCartProductDto,
  ) {
    const product = await this.prisma.cart.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.cart.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCartProductByid(userId: string, bookmarkId: number) {
    const product = await this.prisma.cart.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    // check if user owns the bookmark
    if (!product || product.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.cart.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
