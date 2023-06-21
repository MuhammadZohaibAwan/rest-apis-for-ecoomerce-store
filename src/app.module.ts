import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product/model/product.schema';
import { ProductService } from './product/service/product.service';
import { ProductController } from './product/controller/product.controller';
import { CartController } from './cart/controller/cart.controller';
import { CartService } from './cart/service/cart.service';
import { CartSchema } from './cart/model/cart.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/my_app'), // Specify the full connection URL including the database name
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Cart', schema: CartSchema },
    ]), AuthModule, UsersModule,
  ],
  controllers: [ProductController, CartController],
  providers: [ProductService, CartService],
})
export class AppModule {}
