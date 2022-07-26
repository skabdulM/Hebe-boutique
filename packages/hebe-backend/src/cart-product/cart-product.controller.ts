import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CartProductService } from './cart-product.service';

@UseGuards(JwtGuard)
@Controller('cartproduct')
export class CartProductController {
  constructor(
    private cartProduct: CartProductService,
  ) {}
  @Get()
  getCartProducts(
    @GetUser('id') userId: string,
  ) {}

  @Get(':id')
  getCartProductsbyId(
    @GetUser('id') userId: string,
    @Param('id') productId:string
  ) {}

  @Post()
  addtoCart(@GetUser('id') userId: string) {}

  @Patch()
  editCartProductsbyid(
    @GetUser('id') userId: string,
  ) {}

  @Delete()
  deleteCartProductByid(
    @GetUser('id') userId: string,
  ) {}
}
