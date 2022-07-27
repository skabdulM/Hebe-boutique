import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {


  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  ///status default in db
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;


  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @IsArray()
  @IsNotEmpty()
  products: [];
}
