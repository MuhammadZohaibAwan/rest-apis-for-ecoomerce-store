import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  @IsString()
  readonly productId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly productQuantity: Number;
}
