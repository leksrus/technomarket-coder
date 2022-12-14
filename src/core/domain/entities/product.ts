import { BaseEntity } from '@core/domain/entities/base.entity';
import { ProductType } from '@core/domain/entities/types/product.type';
import { Nullable } from '@core/common/types/common-types';

export class Product extends BaseEntity {
  private _name: string;
  private _description: string;
  private _price: number;
  private _category: string;
  private _stock: number;
  private _thumbnails: string;
  private readonly _createdAt: Date;
  private _editedAt: Nullable<Date>;

  public constructor(payload: ProductType) {
    super(payload.id);
    this._name = payload.name;
    this._description = payload.description;
    this._price = payload.price;
    this._category = payload.category;
    this._stock = payload.stock;
    this._thumbnails = payload.thumbnails;
    this._editedAt = payload.editedAt || null;
    this._createdAt = payload.createdAt || new Date();
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

  public get stock(): number {
    return this._stock;
  }

  public get thumbnails(): string {
    return this._thumbnails;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get editedAt(): Nullable<Date> {
    return this._editedAt;
  }

  public static new(payload: ProductType): Product {
    return new Product(payload);
  }

  public edit(payload: ProductType): void {
    this._name = payload.name;
    this._description = payload.description;
    this._price = payload.price;
    this._category = payload.category;
    this._stock = payload.stock;
    this._thumbnails = payload.thumbnails;
    this._editedAt = new Date();
  }
}
