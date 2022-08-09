import {  IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddTags {

  @IsString()
  @IsNotEmpty()
  tagName: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

}
