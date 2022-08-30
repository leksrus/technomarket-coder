import { BaseEntity } from '@core/domain/entities/base.entity';
import { OrderType } from '@core/domain/entities/types/order.type';
import { OrderStatus } from '@core/common/enums/order-status';
import { Item } from '@core/domain/entities/item';

export class Order extends BaseEntity {
  private readonly _number: number;
  private readonly _status: OrderStatus;
  private readonly _email: string;
  private readonly _items: Array<Item>;
  private readonly _createdAt: Date;

  public constructor(payload: OrderType) {
    super(payload.id);
    this._number = payload.number;
    this._status = payload.status;
    this._email = payload.email;
    this._items = payload.items.map((x) => Item.new(x));
    this._createdAt = payload.createdAt || new Date();
  }

  public get number(): number {
    return this._number;
  }

  public get status(): OrderStatus {
    return this._status;
  }

  public get email(): string {
    return this._email;
  }

  public get items(): Array<Item> {
    return this._items;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public static new(payload: OrderType): Order {
    return new Order(payload);
  }
}
