import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { productSchema, ProductSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/product.schema';
import { ProductsController } from '@application/controllers/products.controller';
import { createProductUseCasePort, productRepositoryPort } from "@core/common/constants/di-constants-tokens";
import { ProductRepositoryAdapter } from '@infrastructure/adapters/persistence/mogoose/repository/product.repository.adapter';
import { CreateProductUseCase } from "@core/services/create-product.usecase";

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductSchema.name, schema: productSchema }])],
  controllers: [ProductsController],
  providers: [
    {
      provide: productRepositoryPort,
      useClass: ProductRepositoryAdapter,
    },
    {
      provide: createProductUseCasePort,
      useClass: CreateProductUseCase,
    },
  ],
})
export class ProductModule {}
