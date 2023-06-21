import { Document } from 'mongoose';

export interface ICart extends Document {
  readonly productQuantity: Number;
  readonly productId: string;
}
