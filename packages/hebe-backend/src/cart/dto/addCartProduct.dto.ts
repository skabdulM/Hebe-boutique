import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class AddCartProductDto{
    @IsString()
    @IsNotEmpty()
    productId: string;
    @IsNumber()
    @IsNotEmpty()
    productQuantity: number;
 
}