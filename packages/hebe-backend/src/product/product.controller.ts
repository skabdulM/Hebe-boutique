import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductDto } from './dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
  ) {}

  @Post('addProduct')
  addProduct(@Body() dto: ProductDto) {
    return this.productService.addProduct(dto);
  }

  //   @HttpCode(HttpStatus.OK)
  @Patch('updateProduct/:id')
  updateProduct(
    @Param('id') productId: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(
      productId,
      dto,
    );
  }

  @Get('getallProducts')
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductByid(@Param('id') productId: string) {
    return this.productService.getProductByid(
      productId,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    return this.productService.deleteProduct(
      productId,
    );
  }
}
