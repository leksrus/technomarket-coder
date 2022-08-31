import { Nullable } from '@core/common/types/common-types';
import { Order } from '@core/domain/entities/order';

export interface OrderRepositoryPort {
  findByEmail(email: string): Promise<Nullable<Array<Order>>>;

  add(order: Order): Promise<Nullable<Order>>;

  findMaxOrderNumber(): Promise<number>;
}
