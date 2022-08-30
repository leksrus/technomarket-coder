import { ItemType } from '@core/domain/entities/types/item.type';
import { BaseEntity } from '@core/domain/entities/base.entity';

export class Item extends BaseEntity {
  private readonly _name: string;
  private readonly _description: string;
  private readonly _price: number;
  private readonly _category: string;
  private readonly _thumbnails: string;
  private readonly _quantity: number;

  public constructor(payload: ItemType) {
    super(undefined);
    this._name = payload.name;
    this._description = payload.description;
    this._price = payload.price;
    this._category = payload.category;
    this._thumbnails = payload.thumbnails;
    this._quantity = payload.quantity;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get price(): string {
    return this.formatNumber(this._price, 2);
  }

  public get category(): string {
    return this._category;
  }

  public get thumbnails(): string {
    return this._thumbnails;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public static new(payload: ItemType): Item {
    return new Item(payload);
  }
}
