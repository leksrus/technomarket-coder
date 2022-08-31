import { Exclude, Expose, plainToClass, Transform, Type } from 'class-transformer';
import { Item } from '@core/domain/entities/item';
import { Cart } from '@core/domain/entities/cart';
import { ItemDto } from "@core/dtos/item.dto";

@Exclude()
export class CartDto {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public orderAddress: string;

  @Expose()
  @Type(() => ItemDto)
  public items: Array<ItemDto>;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value as Date)?.toLocaleString())
  public editedAt: Date;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value as Date).toLocaleString())
  public createdAt: Date;

  public static toCartDto(cart: Cart): CartDto {
    return plainToClass(CartDto, cart);
  }
}
