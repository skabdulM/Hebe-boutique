import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(dto: ProductDto) {
    // const price = parseInt(dto.productPrice);
    const product = await this.prisma.products.create({
      data: {
        productName: dto.productName,
        productDescription: dto.productDescription,
        productPrice: dto.productPrice,
        productImg: dto.productImg,
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
    // const price = parseInt(dto.productPrice);
    const product = await this.prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        productName: dto.productName,
        productDescription: dto.productDescription,
        productPrice: dto.productPrice,
        productImg: dto.productImg,
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
