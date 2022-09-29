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
  Query,
  UseGuards,
} from '@nestjs/common';
import { Products } from '@prisma/client';
import { Roles } from '../auth/decorator';
import { JwtGuard, RolesGuard } from '../auth/guard';
import {
  addProductTag,
  AddProductVariation,
  ProductDto,
  UpdateProductDto,
} from './dto';
import { addProductCategory } from './dto/addCategory';
import { UpdateProductVariation } from './dto/updateVariation.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Post('addProduct')
  addProduct(@Body() dto: ProductDto) {
    return this.productService.addProduct(dto);
  }

  // @HttpCode(HttpStatus.ACCEPTED)
  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('updateProduct/:id')
  updateProduct(
    @Param('id') productId: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(productId, dto);
  }

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('addProductTag')
  productTag(@Body() dto: addProductTag) {
    return this.productService.addProductTag(dto);
    //can take product id using query
  }

  @Get('search')
  searchTag(
    @Query('searchQuery') searchQuery: string,
    @Query('greaterthan', ParseIntPipe) greaterthan: number,
    @Query('lessthan', ParseIntPipe) lessthan: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor') cursor?: string,
  ) {
    return this.productService.search({
      searchQuery,
      greaterthan,
      lessthan,
      take: Number(take),
      cursor: { id: cursor },
    });
  }

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('addProductCategory')
  addproductCategory(@Body() dto: addProductCategory) {
    return this.productService.addProductCategory(dto);
    //can take product id using query
  }

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('addVariation')
  addProductVariation(@Body() dto: AddProductVariation) {
    return this.productService.addProductVariation(dto);
    //can take product id using query
  }

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('updateVariation')
  updateProductVariation(@Body() dto: UpdateProductVariation) {
    return this.productService.updateProductVariation(dto);
    //can take product id using query
  }

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('removeTag')
  removeTag(@Body() dto: addProductTag) {
    return this.productService.removeTag(dto);
    //can take product id using query
  }

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch('removeCategory')
  removeCategory(@Body() dto: addProductCategory) {
    return this.productService.removeCategory(dto);
    //can take product id using query
  }

  @Get('getproducts')
  async getproducts(
    @Query('greaterthan', ParseIntPipe) greaterthan: number,
    @Query('lessthan', ParseIntPipe) lessthan: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('views') views?: string,
    @Query('cursor') cursor?: string,
  ): Promise<Products[]> {
    return this.productService.getProducts({
      greaterthan,
      lessthan,
      take: Number(take),
      views,
      cursor: { id: cursor },
    });
  }

  @Get('getproducts/count')
  async getProductscount(
    @Query('searchQuery') searchQuery?: string,
    @Query('greaterthan', ParseIntPipe) greaterthan?: number,
    @Query('lessthan', ParseIntPipe) lessthan?: number,
  ) {
    return this.productService.searchcount({
      searchQuery,
      greaterthan,
      lessthan,
    });
  }

  // not in use maybe check later
  @Get('getproducts/sortprice/:gt/:lt')
  async sortProductprice(
    @Param('gt', ParseIntPipe) greaterthan: number,
    @Param('lt', ParseIntPipe) lessthan: number,
  ) {
    return this.productService.sortPrice(greaterthan, lessthan);
  }

  @Get('category')
  async getallcatergory() {
    return this.productService.getcategorynames();
  }

  @Get('brand')
  async getBrandnames() {
    return this.productService.getBrandnames();
  }

  @Get(':id')
  getProductByid(@Param('id') productId: string) {
    return this.productService.getProductByid(productId);
  }

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    return this.productService.deleteProduct(productId);
  }

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('variation/:id')
  deleteProductVariation(@Param('id') variationId: string) {
    return this.productService.deleteProductVariation(variationId);
  }

  // to delete disconnected values in tags and categories
  @Delete('categories/deletenull')
  async deletenullCateforiesandTags() {
    return this.productService.deletenullCateforiesandTags();
  }
}
