import { GetOrdersUseCasePort } from '@core/domain/usecases/get-orders.usecase.port';
import { Inject, Injectable } from '@nestjs/common';
import { OrderDto } from '@core/dtos/order.dto';
import { GetOrdersFromEmailPort } from '@core/domain/ports/usecases/order/get-orders-from-email.port';
import { orderRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { OrderRepositoryPort } from '@core/domain/ports/persistence/order.repository.port';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';
import { Order } from '@core/domain/entities/order';

@Injectable()
export class GetOrdersUseCase implements GetOrdersUseCasePort {
  public constructor(
    @Inject(orderRepositoryPort)
    private readonly _orderRepositoryPort: OrderRepositoryPort,
  ) {}
  public async execute(payload: GetOrdersFromEmailPort): Promise<Array<OrderDto>> {
    const orders: Nullable<Array<Order>> = await this._orderRepositoryPort.findByEmail(payload.email);

    if (orders) return OrderDto.toOrderListDto(orders);

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, GetOrdersUseCase.name);
  }
}
