import { CartRepositoryPort } from '@core/domain/ports/persistence/cart.repository.port';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/cart.schema';
import { Cart } from '@core/domain/entities/cart';
import { Nullable } from '@core/common/types/common-types';
import { CartMapper } from '@infrastructure/adapters/persistence/mogoose/mappers/cart.mapper';

@Injectable()
export class CartRepositoryAdapter implements CartRepositoryPort {
  public constructor(@InjectModel(CartSchema.name) private _cartModel: Model<CartSchema>) {}

  public async add(cart: Cart): Promise<Nullable<Cart>> {
    let domainEntity: Nullable<Cart> = null;

    const newCartModel: CartSchema = new this._cartModel(CartMapper.fromDomainToNewModel(cart));

    const response: Nullable<CartSchema> = await newCartModel.save();

    if (response) domainEntity = CartMapper.toDomainEntity(response);

    return domainEntity;
  }

  public async findById(cartId: string): Promise<Nullable<Cart>> {
    let domainEntity: Nullable<Cart> = null;

    const mongoModel: Nullable<CartSchema> = await this._cartModel.findById(cartId).exec();

    if (mongoModel) domainEntity = CartMapper.toDomainEntity(mongoModel);

    return domainEntity;
  }

  public async remove(cart: Cart): Promise<Nullable<Cart>> {
    let domainEntity: Nullable<Cart> = null;

    const mongoModel: Nullable<CartSchema> = await this._cartModel.findByIdAndRemove(cart.id).exec();

    if (mongoModel) domainEntity = CartMapper.toDomainEntity(mongoModel);

    return domainEntity;
  }

  public async update(cart: Cart): Promise<Nullable<Cart>> {
    let domainEntity: Nullable<Cart> = null;

    const newCartModel: Nullable<CartSchema> = await this._cartModel
      .findByIdAndUpdate(cart.id, CartMapper.fromDomainToNewModel(cart), {
        new: true,
      })
      .exec();

    if (newCartModel) domainEntity = CartMapper.toDomainEntity(newCartModel);

    return domainEntity;
  }
}
