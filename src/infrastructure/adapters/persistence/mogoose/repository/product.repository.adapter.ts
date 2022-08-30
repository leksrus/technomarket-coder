import { ProductRepositoryPort } from '@core/domain/ports/persistence/product.repository.port';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/product.schema';
import { Product } from '@core/domain/entities/product';
import { Nullable } from '@core/common/types/common-types';
import { ProductMapper } from '@infrastructure/adapters/persistence/mogoose/mappers/product.mapper';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepositoryPort {
  public constructor(@InjectModel(ProductSchema.name) private _productModel: Model<ProductSchema>) {}

  public async add(product: Product): Promise<Nullable<Product>> {
    let domainEntity: Nullable<Product> = null;

    const newProductModel: ProductSchema = new this._productModel(ProductMapper.fromDomainToNewModel(product));

    const response: Nullable<ProductSchema> = await newProductModel.save();

    if (response) domainEntity = ProductMapper.toDomainEntity(response);

    return domainEntity;
  }

  public async remove(product: Product): Promise<Nullable<Product>> {
    let domainEntity: Nullable<Product> = null;

    const mongoModel: Nullable<ProductSchema> = await this._productModel.findByIdAndRemove(product.id).exec();

    if (mongoModel) domainEntity = ProductMapper.toDomainEntity(mongoModel);

    return domainEntity;
  }

  public async update(product: Product): Promise<Nullable<Product>> {
    let domainEntity: Nullable<Product> = null;

    const newProductModel: Nullable<ProductSchema> = await this._productModel
      .findByIdAndUpdate(product.id, ProductMapper.fromDomainToNewModel(product), {
        new: true,
      })
      .exec();

    if (newProductModel) domainEntity = ProductMapper.toDomainEntity(newProductModel);

    return domainEntity;
  }

  public async findByCategory(category: string): Promise<Nullable<Array<Product>>> {
    let domainEntities: Nullable<Array<Product>> = null;

    const mongoModel: Nullable<Array<ProductSchema>> = await this._productModel
      .find({
        category,
      })
      .exec();

    if (mongoModel) domainEntities = ProductMapper.toDomainListEntities(mongoModel);

    return domainEntities;
  }

  public async findById(productId: string): Promise<Nullable<Product>> {
    let domainEntity: Nullable<Product> = null;

    const mongoModel: Nullable<ProductSchema> = await this._productModel.findById(productId).exec();

    if (mongoModel) domainEntity = ProductMapper.toDomainEntity(mongoModel);

    return domainEntity;
  }
}
