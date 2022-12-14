import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class ItemDto {
  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public price: string;

  @Expose()
  public category: string;

  @Expose()
  @Type(() => Number)
  public quantity: number;

  @Expose()
  public thumbnails: string;
}
