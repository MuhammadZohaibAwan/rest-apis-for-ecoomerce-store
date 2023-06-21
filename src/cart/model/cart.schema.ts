import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Cart {
  @Prop()
  productId: string;

  @Prop()
  productQuantity: Number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
