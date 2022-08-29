import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { RemoveProductPort } from '@core/domain/ports/usecases/product/remove-product.port';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class RemoveProductAdapter extends UseCaseValidatableAdapter implements RemoveProductPort {
  @Expose()
  @IsNotEmpty()
  public id: string;

  public static async new(payload: RemoveProductPort): Promise<RemoveProductAdapter> {
    const adapter: RemoveProductAdapter = plainToClass(RemoveProductAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
