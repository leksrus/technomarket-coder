import { OrderRepositoryPort } from '@core/domain/ports/persistence/order.repository.port';
import { Nullable } from '@core/common/types/common-types';
import { Order } from '@core/domain/entities/order';
import { OrderSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/order.schema';
import { OrderMapper } from '@infrastructure/adapters/persistence/mogoose/mappers/order.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepositoryAdapter implements OrderRepositoryPort {
  public constructor(@InjectModel(OrderSchema.name) private _orderModel: Model<OrderSchema>) {}
  public async add(order: Order): Promise<Nullable<Order>> {
    let domainEntity: Nullable<Order> = null;

    const newOrderModel: OrderSchema = new this._orderModel(OrderMapper.fromDomainToNewModel(order));

    const response: Nullable<OrderSchema> = await newOrderModel.save();

    if (response) domainEntity = OrderMapper.toDomainEntity(response);

    return domainEntity;
  }

  public async findByEmail(email: string): Promise<Nullable<Array<Order>>> {
    let domainEntities: Nullable<Array<Order>> = null;

    const mongoModel: Nullable<Array<OrderSchema>> = await this._orderModel
      .find({
        email,
      })
      .exec();

    if (mongoModel) domainEntities = OrderMapper.toDomainListEntities(mongoModel);

    return domainEntities;
  }

  public async findMaxOrderNumber(): Promise<number> {
    const mongoModel: Nullable<OrderSchema> = await this._orderModel.findOne().sort('-number').exec();

    if (mongoModel) return mongoModel.number;

    return 1;
  }
}
