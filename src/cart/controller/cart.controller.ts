import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { CartDto } from '../dto/cart.dto';
import { CartService } from '../../cart/service/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCartItems(@Res() response) {
    try {
      const itemsData = await this.cartService.getCartItems();
      return response.status(HttpStatus.OK).json({
        message: 'All Items data found successfully',
        itemsData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async addItems(@Res() response, @Body() cartDto: CartDto) {
    try {
      const newItem = await this.cartService.addItems(cartDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Item has been added successfully',
        newItem,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Item not added',
        error: 'Bad Request',
      });
    }
  }
  @Delete(':id')
  async deleteCartItems(@Res() response, @Param('id') id?: string) {
    try {
      // Delete a specific cart item by ID
      await this.cartService.deleteCartItems(id);

      // Get the remaining cart items
      const remainingItems = await this.cartService.getCartItems();
      const remainingItemCount = remainingItems.length;

      return response.status(HttpStatus.OK).json({
        remainingItems: remainingItemCount,
        message: 'Cart items deleted successfully',
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to delete cart items',
        error: err.message,
      });
    }
  }
}
