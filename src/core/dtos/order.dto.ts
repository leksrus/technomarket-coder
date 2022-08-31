import { Exclude, Expose, plainToClass, Transform, Type } from 'class-transformer';
import { OrderStatus } from '@core/common/enums/order-status';
import { Item } from '@core/domain/entities/item';
import { Order } from '@core/domain/entities/order';
import { ItemDto } from "@core/dtos/item.dto";

@Exclude()
export class OrderDto {
  @Expose()
  public id: string;

  @Expose()
  public number: string;

  @Expose()
  public status: OrderStatus;

  @Expose()
  public email: string;

  @Expose()
  @Type(() => ItemDto)
  public items: Array<ItemDto>;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value as Date).toLocaleString())
  public createdAt: Date;

  public static toOrderDto(order: Order): OrderDto {
    return plainToClass(OrderDto, order);
  }

  public static toOrderListDto(orders: Array<Order>): Array<OrderDto> {
    return orders.map((x) => this.toOrderDto(x));
  }
}
