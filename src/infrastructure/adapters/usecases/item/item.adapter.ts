import { ItemPort } from '@core/domain/ports/usecases/item/item.port';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@Exclude()
export class ItemAdapter implements ItemPort {
  @Expose()
  @IsNotEmpty()
  public category: string;

  @Expose()
  @IsNotEmpty()
  public description: string;

  @Expose()
  @IsNotEmpty()
  public name: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  public price: number;

  @Expose()
  @IsNumber()
  @IsPositive()
  public quantity: number;

  @Expose()
  @IsNotEmpty()
  public thumbnails: string;
}
