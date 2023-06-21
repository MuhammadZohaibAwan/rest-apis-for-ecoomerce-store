import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { IProduct } from '../interface/product.interface';
import { Product } from 'src/product/model/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async createProduct(productDto: ProductDto): Promise<Product> {
    const newProduct = await new this.productModel(productDto);
    return newProduct.save();
  }

  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productModel.deleteOne({ _id: id });
  }

  async getAllProducts(): Promise<IProduct[]> {
    const productData = await this.productModel.find();
    if (!productData || productData.length === 0) {
      return [];
    }
    return productData;
  }
}
