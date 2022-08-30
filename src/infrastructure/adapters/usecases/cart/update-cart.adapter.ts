import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { UpdateCartPort } from '@core/domain/ports/usecases/cart/update-cart.port';
import { Exclude, Expose, plainToClass, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { ItemAdapter } from '@infrastructure/adapters/usecases/item/item.adapter';

@Exclude()
export class UpdateCartAdapter extends UseCaseValidatableAdapter implements UpdateCartPort {
  @Expose()
  @IsNotEmpty()
  public id: string;

  @Expose()
  @IsNotEmpty()
  public email: string;

  @Expose()
  @IsNotEmpty()
  public orderAddress: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ItemAdapter)
  public items?: Array<ItemAdapter>;

  public static async new(payload: UpdateCartPort): Promise<UpdateCartAdapter> {
    const adapter: UpdateCartAdapter = plainToClass(UpdateCartAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
