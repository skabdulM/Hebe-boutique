import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class addProductCategory {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    productId: string;
  }
  