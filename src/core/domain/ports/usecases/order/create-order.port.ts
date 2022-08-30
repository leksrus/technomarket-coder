import { OrderStatus } from '@core/common/enums/order-status';
import { ItemPort } from '@core/domain/ports/usecases/item/item.port';

export interface CreateOrderPort {
  status?: OrderStatus;
  email: string;
  items: Array<ItemPort>;
}
