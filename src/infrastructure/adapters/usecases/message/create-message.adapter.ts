import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { CreateMessagePort } from '@core/domain/ports/usecases/message/create-message.port';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserTypes } from '@core/common/enums/user-types';

@Exclude()
export class CreateMessageAdapter extends UseCaseValidatableAdapter implements CreateMessagePort {
  @Expose()
  @IsNotEmpty()
  public email: string;

  @Expose()
  @IsOptional()
  @IsEnum(UserTypes)
  public u: UserTypes;

  @Expose()
  @IsNotEmpty()
  public message: string;

  public static async new(payload: CreateMessagePort): Promise<CreateMessageAdapter> {
    const adapter: CreateMessageAdapter = plainToClass(CreateMessageAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
