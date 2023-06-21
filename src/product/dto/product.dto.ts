import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class ProductDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly product: string;
}
