import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { productSchema, ProductSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/product.schema';
import { ProductsController } from '@application/controllers/products.controller';
import {
  createProductUseCasePort,
  getProductsUseCasePort, getProductUseCasePort,
  productRepositoryPort, removeProductUseCasePort, updateProductUseCasePort
} from "@core/common/constants/di-constants-tokens";
import { ProductRepositoryAdapter } from '@infrastructure/adapters/persistence/mogoose/repository/product.repository.adapter';
import { CreateProductUseCase } from "@core/services/create-product.usecase";
import { GetProductsUseCase } from "@core/services/get-products.usecase";
import { GetProductUseCase } from "@core/services/get-product.usecase";
import { UpdateProductUseCase } from "@core/services/update-product.usecase";
import { RemoveProductUseCase } from "@core/services/remove-product.usecase";

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
    {
      provide: getProductsUseCasePort,
      useClass: GetProductsUseCase,
    },
    {
      provide: getProductUseCasePort,
      useClass: GetProductUseCase,
    },
    {
      provide: updateProductUseCasePort,
      useClass: UpdateProductUseCase,
    },
    {
      provide: removeProductUseCasePort,
      useClass: RemoveProductUseCase,
    },
  ],
})
export class ProductModule {}
