import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/product',{
      autoCreate: true,
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
