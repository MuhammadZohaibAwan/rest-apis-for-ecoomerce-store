import { Document } from 'mongoose';
export interface IProduct extends Document {
  readonly product: string;
}
