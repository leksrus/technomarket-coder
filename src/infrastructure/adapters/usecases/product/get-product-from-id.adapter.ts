import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { GetProductFromIdPort } from '@core/domain/ports/usecases/product/get-product-from-id.port';
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class GetProductFromIdAdapter extends UseCaseValidatableAdapter implements GetProductFromIdPort {
  @Expose()
  @IsNotEmpty()
  public id: string;

  public static async new(payload: GetProductFromIdPort): Promise<GetProductFromIdAdapter> {
    const adapter: GetProductFromIdAdapter = plainToClass(GetProductFromIdAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
