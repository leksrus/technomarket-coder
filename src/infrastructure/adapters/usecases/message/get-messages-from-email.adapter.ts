import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { GetMessagesFromEmailPort } from '@core/domain/ports/usecases/message/get-messages-from-email.port';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class GetMessagesFromEmailAdapter extends UseCaseValidatableAdapter implements GetMessagesFromEmailPort {
  @Expose()
  @IsNotEmpty()
  public email: string;

  public static async new(payload: GetMessagesFromEmailPort): Promise<GetMessagesFromEmailAdapter> {
    const adapter: GetMessagesFromEmailAdapter = plainToClass(GetMessagesFromEmailAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
