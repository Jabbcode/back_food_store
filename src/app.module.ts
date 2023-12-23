import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresModule } from './modules/stores/stores.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UnitsModule } from './modules/units/units.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/food_store'),
    StoresModule,
    ProductsModule,
    CategoriesModule,
    UnitsModule,
  ],
})
export class AppModule {}
