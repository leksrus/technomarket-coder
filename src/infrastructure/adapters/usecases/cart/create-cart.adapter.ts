import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { CreateCartPort } from '@core/domain/ports/usecases/cart/create-cart.port';
import { ItemAdapter } from '@infrastructure/adapters/usecases/item/item.adapter';
import { Exclude, Expose, plainToClass, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

@Exclude()
export class CreateCartAdapter extends UseCaseValidatableAdapter implements CreateCartPort {
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

  public static async new(payload: CreateCartPort): Promise<CreateCartAdapter> {
    const adapter: CreateCartAdapter = plainToClass(CreateCartAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
