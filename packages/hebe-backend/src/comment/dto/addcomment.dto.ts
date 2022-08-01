import {  IsOptional, IsString } from 'class-validator';

export class AddCommentDto {
  @IsString()
  @IsOptional()
  feedback?: string;

  @IsString()
  @IsOptional()
  productId?: string;

  // @IsString()
  // @IsOptional()
  // user?: string;
}
