import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { addProductTag, ProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(dto: ProductDto) {
    const product = await this.prisma.products
      .create({
        data: {
          ...dto,
          category: {
            connectOrCreate: {
              where: {
                name: dto.category,
              },
              create: {
                name: dto.category,
              },
            },
          },
          brand: {
            connectOrCreate: {
              where: {
                name: dto.brand.toLowerCase(),
              },
              create: {
                name: dto.brand.toLowerCase(),
              },
            },
          },
        },
        // include: {
        //   category: {
        //     select: {
        //       name: true,
        //     },
        //   },
        //   brand: {
        //     select: {
        //       name: true,
        //     },
        //   },
        //   tags: true,
        // },
      })
      .catch((error) => {
        return error;
      });
    return product;
  }

  async getProducts() {
    const products = await this.prisma.products.findMany({
      include: {
        category: true,
        brand: true,
        tags: true,
      },
    });
    // {take:3}       //only takes 3
    return products;
  }

  async updateProduct(productId: string, dto: UpdateProductDto) {
    const product = await this.prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
        category: {
          connectOrCreate: {
            where: {
              name: dto.category,
            },
            create: {
              name: dto.category,
            },
          },
        },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        tags: true,
      },
    });
    return product;
  }

  async addProductTag(dto: addProductTag) {
    const tag = await this.prisma.products.update({
      where: {
        id: dto.productId,
      },
      data: {
        tags: {
          connectOrCreate: {
            where: {
              tagName: dto.tagName,
            },
            create: {
              tagName: dto.tagName,
            },
          },
        },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        tags: true,
      },
    });
    return tag;
  }

  async removeTag(dto: addProductTag) {
    const tag = await this.prisma.products.update({
      where: {
        id: dto.productId,
      },
      data: {
        tags: {
          disconnect: {
            tagName: dto.tagName,
          },
        },
      },
      include: {
        tags: true,
      },
    });
    return tag;
  }

  async getProductByid(productId: string) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        tags: true,
      },
    });
    return product;
  }

  async deleteProduct(productId: string) {
    await this.prisma.products.delete({
      where: {
        id: productId,
      },
    });
  }
}

/*
    const price = parseInt(dto.productPrice);
    productName: dto.productName,
    productDescription: dto.productDescription,
    productPrice: dto.productPrice,
    productImg: dto.productImg,
*/
