import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { GetCartFromId } from '@core/domain/ports/usecases/cart/get-cart-from-id';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class GetCartFromIdAdapter extends UseCaseValidatableAdapter implements GetCartFromId {
  @Expose()
  @IsNotEmpty()
  public id: string;

  public static async new(payload: GetCartFromId): Promise<GetCartFromIdAdapter> {
    const adapter: GetCartFromIdAdapter = plainToClass(GetCartFromIdAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
