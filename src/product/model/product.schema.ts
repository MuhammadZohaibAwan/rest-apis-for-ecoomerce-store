import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  product: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
