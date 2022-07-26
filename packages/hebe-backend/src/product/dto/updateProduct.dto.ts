import {
    // IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class UpdateProductDto {
    @IsString()
    @IsOptional()
    productName: string;
  
    @IsString()
    @IsOptional()
    productDescription: string;
  
    @IsString()
    @IsOptional()
    productPrice: string;
  
    @IsString()
    @IsOptional()
    productImg: string;
  }
  