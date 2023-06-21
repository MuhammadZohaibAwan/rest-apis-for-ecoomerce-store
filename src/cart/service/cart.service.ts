import { Injectable, NotFoundException, Req, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from '../model/cart.schema';
import { ICart } from '../../cart/interface/cart.interface';
import { CartDto } from '../dto/cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<Cart>) {}

  async addItems(cartDto: CartDto): Promise<Cart> {
    const newItem = await new this.cartModel(cartDto);
    return newItem.save();
  }

  async deleteCartItems(@Param('id') id: string): Promise<void> {
    await this.cartModel.deleteOne({ _id: id });
  }

  async getCartItems(): Promise<ICart[]> {
    const cartItems = await this.cartModel.find();
    if (!cartItems || cartItems.length === 0) {
      return [];
    }
    return cartItems;
  }
}
