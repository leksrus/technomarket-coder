import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { GetOrdersFromEmailPort } from '@core/domain/ports/usecases/order/get-orders-from-email.port';
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class GetOrdersFromEmailAdapter extends UseCaseValidatableAdapter implements GetOrdersFromEmailPort {
  @Expose()
  @IsNotEmpty()
  public email: string;

  public static async new(payload: GetOrdersFromEmailPort): Promise<GetOrdersFromEmailAdapter> {
    const adapter: GetOrdersFromEmailAdapter = plainToClass(GetOrdersFromEmailAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
