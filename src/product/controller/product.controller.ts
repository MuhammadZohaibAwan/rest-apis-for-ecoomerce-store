import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { ProductService } from '../../product/service/product.service';
import { ProductDto } from '../dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Res() response) {
    try {
      const ProductData = await this.productService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        message: 'All Products data found successfully',
        ProductData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async createProduct(@Res() response, @Body() productDto: ProductDto) {
    try {
      const newProduct = await this.productService.createProduct(productDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been added successfully',
        newProduct,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: 'Bad Request',
      });
    }
  }

  // @Delete(':id')
  // async deleteAllProducts(@Res() response, @Param('id') id?: string) {
  //   await this.productService.deleteProduct(id);
  //   const remainingProducts = await this.productService.getAllProducts();

  //   if (remainingProducts.length === 0) {
  //     return response.status(HttpStatus.OK).json({
  //       message: 'No products found',
  //     });
  //   } else {
  //     return response.status(HttpStatus.OK).json({
  //       remainingProducts: remainingProducts.length,
  //       message: 'Product deleted successfully',
  //     });
  //   }
  // }

  @Delete(':id')
  async deleteAllProducts(@Res() response, @Param('id') id?: string) {
    try {
      // Delete a specific cart item by ID
      await this.productService.deleteProduct(id);

      // Get the remaining cart items
      const remainingProducts = await this.productService.getAllProducts();
      const remainingProductCount = remainingProducts.length;

      return response.status(HttpStatus.OK).json({
        remainingProducts: remainingProductCount,
        message: 'Products deleted successfully',
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to delete products ',
        error: err.message,
      });
    }
  }
}
