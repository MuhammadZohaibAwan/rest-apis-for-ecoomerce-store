import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './model/product.schema';
import { ProductService } from '../product/service/product.service';
import { ProductController } from '../product/controller/product.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/my_app'), // Specify the full connection URL including the database name
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
