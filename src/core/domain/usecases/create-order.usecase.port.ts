import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { CreateOrderPort } from '@core/domain/ports/usecases/order/create-order.port';
import { OrderDto } from '@core/dtos/order.dto';

export interface CreateOrderUseCasePort extends BaseUseCase<CreateOrderPort, OrderDto> {}
