import { BaseEntity } from '@core/domain/entities/base.entity';
import { Nullable } from '@core/common/types/common-types';
import { Item } from '@core/domain/entities/item';
import { CartType } from '@core/domain/entities/types/cart.type';

export class Cart extends BaseEntity {
  private _email: string;
  private _orderAddress: string;
  private _items: Nullable<Array<Item>>;
  private readonly _createdAt: Date;
  private _editedAt: Nullable<Date>;

  public constructor(payload: CartType) {
    super(payload.id);
    this._email = payload.email;
    this._orderAddress = payload.orderAddress;
    this._items = null;
    this._editedAt = payload.editedAt || null;
    this._createdAt = payload.createdAt || new Date();
  }

  public static new(payload: CartType): Cart {
    return new Cart(payload);
  }

  public edit(payload: CartType): void {
    this._email = payload.email;
    this._orderAddress = payload.orderAddress;
    this._editedAt = new Date();
  }

  public get email(): string {
    return this._email;
  }

  public get orderAddress(): string {
    return this._orderAddress;
  }

  public get items(): Nullable<Array<Item>> {
    return this._items;
  }

  public set items(value: Array<Item>) {
    this._items = value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get editedAt(): Nullable<Date> {
    return this._editedAt;
  }
}
