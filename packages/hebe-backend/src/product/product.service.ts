import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async addProduct(dto: ProductDto) {
    const product = await this.prisma.products.create({
      data: {
        ...dto,
        // category:{
        //   create:{
        //     name:"awdawd"
        //   }
        // }
        category: {
          connectOrCreate:{
            where:{
              name:dto.category
            },
            create:{
              name:dto.category
            }
          }
        },
        // categoryId: 3,
      },
    });

    return product;
  }

  async getProducts() {
    const products = await this.prisma.products.findMany();
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
      },
    });
    return product;
  }

  async getProductByid(productId: string) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: productId,
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
