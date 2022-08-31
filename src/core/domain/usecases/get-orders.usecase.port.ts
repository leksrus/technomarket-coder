import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { GetOrdersFromEmailPort } from '@core/domain/ports/usecases/order/get-orders-from-email.port';
import { OrderDto } from '@core/dtos/order.dto';

export interface GetOrdersUseCasePort extends BaseUseCase<GetOrdersFromEmailPort, Array<OrderDto>> {}
