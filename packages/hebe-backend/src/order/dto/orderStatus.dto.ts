import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class OrderStatusDto {
  ///status default in db
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
