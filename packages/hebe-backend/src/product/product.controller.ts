import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorator';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ProductDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('addProduct')
  addProduct(@Body() dto:ProductDto) {
    return this.productService.addProduct(dto);
  }

  // @HttpCode(HttpStatus.ACCEPTED)
  @Roles('MANAGER','ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('updateProduct/:id')
  updateProduct(
    @Param('id') productId: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(productId, dto);
  }

  @Get('getallProducts')
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductByid(@Param('id') productId: string) {
    return this.productService.getProductByid(productId);
  }

  @Roles('MANAGER','ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
