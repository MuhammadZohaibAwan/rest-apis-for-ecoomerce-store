import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/product/model/product.schema';
import { CartSchema } from './model/cart.schema';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/my_app'), // Specify the full connection URL including the database name
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Cart', schema: CartSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class AppModule {}
