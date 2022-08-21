import { Injectable } from '@nestjs/common';
import { Prisma, Products } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { addProductTag, ProductDto, UpdateProductDto } from './dto';
import { addProductCategory } from './dto/addCategory';

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
                name: dto.category.toLowerCase(),
              },
              create: {
                name: dto.category.toLowerCase(),
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
      })
      .catch((error) => {
        return error;
      });
    return product;
  }

  async searchcount(params: {
    searchQuery?: string;
    greaterthan?: number;
    lessthan?: number;
  }) {
    const { searchQuery, greaterthan, lessthan } = params;
    if (searchQuery) {
      const productsCount = await this.prisma.products.count({
        where: {
          OR: [
            {
              tags: {
                some: {
                  tagName: {
                    startsWith: searchQuery ? searchQuery : undefined,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              category: {
                some: {
                  name: {
                    startsWith: searchQuery ? searchQuery : undefined,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              productName: {
                startsWith: searchQuery ? searchQuery : undefined,
                mode: 'insensitive',
              },
            },
          ],
          AND: [
            {
              productPrice: {
                gte: greaterthan,
                lte: lessthan,
              },
            },
          ],
        },
      });
      return productsCount;
    } else {
      const productsCount = await this.prisma.products.count({
        where: {
          productPrice: {
            gte: greaterthan,
            lte: lessthan,
          },
        },
      });
      return productsCount;
    }
  }

  async sortPrice(greaterthan: number, lessthan: number) {
    return await this.prisma.products.findMany({
      where: {
        productPrice: {
          gte: greaterthan,
          lte: lessthan,
        },
      },
      orderBy: {
        productPrice: 'asc',
      },
    });
  }

  async updateProduct(productId: string, dto: UpdateProductDto) {
    const product = await this.prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
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
              tagName: dto.tagName.toLowerCase(),
            },
            create: {
              tagName: dto.tagName.toLowerCase(),
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

  async search(params: {
    searchQuery: string;
    greaterthan: number;
    lessthan: number;
    take: number;
    cursor?: Prisma.ProductsWhereUniqueInput;
  }) {
    const { searchQuery, greaterthan, lessthan, take, cursor } =
      params;
    if (cursor.id) {
      const search = await this.prisma.products.findMany({
        take: take ? take : undefined,
        skip: 1,
        cursor,
        where: {
          OR: [
            {
              tags: {
                some: {
                  tagName: {
                    startsWith: searchQuery,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              category: {
                some: {
                  name: {
                    startsWith: searchQuery,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              productName: {
                startsWith: searchQuery,
                mode: 'insensitive',
              },
            },
          ],
          AND: [
            {
              productPrice: {
                gte: greaterthan,
                lte: lessthan,
              },
            },
          ],
        },
        orderBy: { productName: 'asc' },
      });
      return search;
    } else {
      const search = await this.prisma.products.findMany({
        take: take ? take : undefined,
        where: {
          OR: [
            {
              tags: {
                some: {
                  tagName: {
                    startsWith: searchQuery,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              category: {
                some: {
                  name: {
                    startsWith: searchQuery,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              productName: {
                startsWith: searchQuery,
                mode: 'insensitive',
              },
            },
          ],
          AND: [
            {
              productPrice: {
                gte: greaterthan,
                lte: lessthan,
              },
            },
          ],
        },
        orderBy: { productName: 'asc' },
      });
      return search;
    }
  }

  async addProductCategory(dto: addProductCategory) {
    const tag = await this.prisma.products.update({
      where: {
        id: dto.productId,
      },
      data: {
        category: {
          connectOrCreate: {
            where: {
              name: dto.name.toLowerCase(),
            },
            create: {
              name: dto.name.toLowerCase(),
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

  async getcategorynames() {
    return await this.prisma.category.findMany({
      where: {
        NOT: [
          {
            products: {
              none: {},
            },
          },
        ],
      },
      select: { name: true },
    });
  }

  async getProducts(params: {
    greaterthan: number;
    lessthan: number;
    take: number;
    cursor?: Prisma.ProductsWhereUniqueInput;
  }): Promise<Products[]> {
    const { greaterthan, lessthan, take, cursor } = params;
    if (cursor.id) {
      return this.prisma.products.findMany({
        take,
        skip: 1,
        cursor,
        where: {
          AND: [
            {
              productPrice: {
                gte: greaterthan,
                lte: lessthan,
              },
            },
          ],
        },
      });
    } else {
      return this.prisma.products.findMany({
        take,
        where: {
          AND: [
            {
              productPrice: {
                gte: greaterthan,
                lte: lessthan,
              },
            },
          ],
        },
      });
    }
  }

  async deleteProduct(productId: string) {
    await this.prisma.products.delete({
      where: {
        id: productId,
      },
    });
  }

  async deletenullCateforiesandTags() {
    const nullCategories = await this.prisma.category.deleteMany({
      where: {
        products: {
          none: {},
        },
      },
    });
    const nullTags = await this.prisma.tags.deleteMany({
      where: {
        Products: {
          none: {},
        },
      },
    });

    return [nullCategories, nullTags];
  }

  async removeTag(dto: addProductTag) {
    const tag = await this.prisma.products.update({
      where: {
        id: dto.productId,
      },
      data: {
        tags: {
          disconnect: {
            tagName: dto.tagName.toLowerCase(),
          },
        },
      },
      include: {
        tags: true,
      },
    });
    return tag;
  }

  async removeCategory(dto: addProductCategory) {
    const category = await this.prisma.products.update({
      where: {
        id: dto.productId,
      },
      data: {
        category: {
          disconnect: {
            name: dto.name.toLowerCase(),
          },
        },
      },
      include: {
        category: true,
      },
    });
    return category;
  }
}
