import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { CreateOrderPort } from '@core/domain/ports/usecases/order/create-order.port';
import { Exclude, Expose, plainToClass, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { ItemAdapter } from '@infrastructure/adapters/usecases/item/item.adapter';
import { OrderStatus } from '@core/common/enums/order-status';

@Exclude()
export class CreateOrderAdapter extends UseCaseValidatableAdapter implements CreateOrderPort {
  @Expose()
  @IsNotEmpty()
  public email: string;

  @Expose()
  @ValidateNested()
  @Type(() => ItemAdapter)
  public items: Array<ItemAdapter>;

  @Expose()
  @IsOptional()
  @IsEnum(OrderStatus)
  public status: OrderStatus;

  public static async new(payload: CreateOrderPort): Promise<CreateOrderAdapter> {
    const adapter: CreateOrderAdapter = plainToClass(CreateOrderAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
