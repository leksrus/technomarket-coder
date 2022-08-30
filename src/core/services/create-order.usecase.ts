import { CreateOrderUseCasePort } from '@core/domain/usecases/create-order.usecase.port';
import { OrderDto } from '@core/dtos/order.dto';
import { Inject, Injectable } from '@nestjs/common';
import { orderRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { OrderRepositoryPort } from '@core/domain/ports/persistence/order.repository.port';
import { CreateOrderPort } from '@core/domain/ports/usecases/order/create-order.port';
import { Order } from '@core/domain/entities/order';
import { ItemType } from '@core/domain/entities/types/item.type';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';

@Injectable()
export class CreateOrderUseCase implements CreateOrderUseCasePort {
  public constructor(
    @Inject(orderRepositoryPort)
    private readonly _orderRepositoryPort: OrderRepositoryPort,
  ) {}
  public async execute(payload: CreateOrderPort): Promise<OrderDto> {
    const maxOrder: number = await this._orderRepositoryPort.findMaxOrderNumber();

    const items: Array<ItemType> = payload.items.map((x) => {
      return {
        name: x.name,
        description: x.description,
        category: x.category,
        price: x.price,
        thumbnails: x.thumbnails,
        quantity: x.quantity,
      };
    });

    const order: Order = Order.new({
      status: payload.status,
      number: maxOrder + 1,
      email: payload.email,
      items: items,
    });

    const newOrder: Nullable<Order> = await this._orderRepositoryPort.add(order);

    if (newOrder) return OrderDto.toOrderDto(newOrder);

    throw Exception.new(
      {
        code: StatusCode.INTERNAL_SERVER_ERROR,
        data: undefined,
      },
      CreateOrderUseCase.name,
    );
  }
}
