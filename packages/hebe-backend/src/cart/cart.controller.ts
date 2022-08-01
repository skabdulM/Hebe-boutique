import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { AddCartProductDto } from './dto';
import { EditCartProductDto } from './dto/editCartProduct.dto';
import { JwtGuard } from '../auth/guard';
import { CartService } from './cart.service';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Get()
    getCartProducts(@GetUser('id') userId: string) {
      return this.cartService.getCartProducts(userId);
    }
  
    @Get('getCartProduct/:id')
    getCartProductsbyId(
      @GetUser('id') userId: string,
      @Param('id', ParseIntPipe) cartproductId: number,
    ) {
      return this.cartService.getCartProductsbyId(userId, cartproductId);
    }
  
    @Post('addtoCart')
    addtoCart(
      @GetUser('id') userId: string,
      @Body() dto: AddCartProductDto,
    ) {
      return this.cartService.addtoCart(userId, dto);
    }
  
   
    @Patch('updateCartProduct/:id')
    editCartProductsbyid(
      @GetUser('id') userId: string,
      @Param('id', ParseIntPipe) cartproductId: number,
      @Body() dto: EditCartProductDto,
    ) {
      return this.cartService.editCartProductbyid(
        userId,
        cartproductId,
        dto,
      );
    }
  
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('remove/:id')
    deleteCartProductByid(
      @GetUser('id') userId: string,
      @Param('id', ParseIntPipe) cartproductId: number,
    ) {
      return this.cartService.deleteCartProductByid(
        userId,
        cartproductId,
      );
    }
}
