import { Nullable } from '@core/common/types/common-types';
import { Message } from '@core/domain/entities/message';

export interface MessageRepositoryPort {
  findByEmail(email: string): Promise<Nullable<Array<Message>>>;

  add(message: Message): Promise<Nullable<Message>>;
}
