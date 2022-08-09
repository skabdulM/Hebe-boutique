import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderDto {


  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsOptional()
  phone2?: string;

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
