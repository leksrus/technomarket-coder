import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { RemoveCartPort } from '@core/domain/ports/usecases/cart/remove-cart.port';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class RemoveCartAdapter extends UseCaseValidatableAdapter implements RemoveCartPort {
  @Expose()
  @IsNotEmpty()
  public id: string;

  public static async new(payload: RemoveCartPort): Promise<RemoveCartAdapter> {
    const adapter: RemoveCartAdapter = plainToClass(RemoveCartAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
