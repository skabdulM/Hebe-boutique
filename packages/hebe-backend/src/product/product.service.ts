import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Products } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  addProductTag,
  AddProductVariation,
  ProductDto,
  UpdateProductDto,
} from './dto';
import { addProductCategory } from './dto/addCategory';
import { UpdateProductVariation } from './dto/updateVariation.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(dto: ProductDto) {
    const product = await this.prisma.products
      .create({
        data: {
          productName: dto.productName,
          productDescription: dto.productDescription,
          productPrice: dto.productPrice,
          productImg: dto.productImg,
          productDiscount: dto.productDiscount
            ? dto.productDiscount
            : undefined,
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
          brand: dto.brand
            ? {
                connectOrCreate: {
                  where: {
                    name: dto.brand.toLowerCase(),
                  },
                  create: {
                    name: dto.brand.toLowerCase(),
                  },
                },
              }
            : undefined,
          variations: {
            create: {
              productSize: dto.productSize.toUpperCase(),
              productQuantity: dto.productQuantity,
              productColor: dto.productColor
                ? dto.productColor.toUpperCase()
                : undefined,
            },
          },
        },
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
    return product;
  }

  async updateProduct(productId: string, dto: UpdateProductDto) {
    const product = await this.prisma.products
      .update({
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
      })
      .catch((error) => {
        throw new BadRequestException(error);
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
                    contains: searchQuery,
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
                    contains: searchQuery,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              productName: {
                startsWith: searchQuery ? searchQuery : undefined,
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
            {
              brand: {
                name: {
                  equals: searchQuery ? searchQuery : undefined,
                  mode: 'insensitive',
                },
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

  async addProductTag(dto: addProductTag) {
    const tag = await this.prisma.products
      .update({
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
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
    return tag;
  }

  async addProductVariation(dto: AddProductVariation) {
    const variation = await this.prisma.productVariations
      .create({
        data: {
          productsId: dto.productId,
          productSize: dto.productSize.toUpperCase(),
          productColor: dto.productColor,
          productQuantity: dto.productQuantity,
        },
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
    return variation;
  }

  async updateProductVariation(dto: UpdateProductVariation) {
    const variation = await this.prisma.productVariations
      .update({
        where: {
          id: dto.id,
        },
        data: {
          ...dto,
        },
      })
      .catch((error) => {
        console.log(error);
        throw new BadRequestException(error);
      });
    return variation;
  }

  //use prisma search defined in the docs here https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search
  //use every instead of some if search have issues, can read prisma docs  https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#atomic-number-operations
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
                    contains: searchQuery,
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
                    contains: searchQuery,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              productName: {
                startsWith: searchQuery,
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
            {
              brand: {
                name: {
                  equals: searchQuery,
                  // startsWith:searchQuery,
                  mode: 'insensitive',
                },
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
<<<<<<< Updated upstream
        orderBy: { productName: 'asc' },
=======
        include: {
          variations: true,
        },
>>>>>>> Stashed changes
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
                    contains: searchQuery,
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
                    contains: searchQuery,
                    mode: 'insensitive',
                  },
                },
              },
            },
            {
              productName: {
                startsWith: searchQuery,
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
            {
              brand: {
                name: {
                  equals: searchQuery,
                  // startsWith: searchQuery,
                  contains: searchQuery,
                  mode: 'insensitive',
                },
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
<<<<<<< Updated upstream
        orderBy: { productName: 'asc' },
=======
        include: {
          variations: true,
        },
>>>>>>> Stashed changes
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
    const product = await this.prisma.products
      .findUnique({
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
          variations: true,
        },
      })
      .then(async (data) => {
        await this.prisma.products.update({
          where: {
            id: productId,
          },
          data: {
            views: {
              increment: 1,
            },
          },
        });
        return data;
      })
      .catch((error) => {
        throw new NotFoundException('product Not found', error);
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

  async getBrandnames() {
    return await this.prisma.brands.findMany({
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
    views?: any;
    cursor?: Prisma.ProductsWhereUniqueInput;
  }): Promise<Products[]> {
    const { greaterthan, lessthan, take, views, cursor } = params;
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
        include: {
          variations: true,
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
        include: {
          variations: true,
          brand:true
        },
        orderBy: {
          views: views ? views : undefined,
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

  async deleteProductVariation(variationId: string) {
    return await this.prisma.productVariations.delete({
      where: {
        id: variationId,
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

  //change name of addproducttag and replace to product tag
  async removeTag(dto: addProductTag) {
    const tag = await this.prisma.products
      .update({
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
      })
      .catch((error) => {
        throw new BadRequestException(error);
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
