import { GetMessagesUseCasePort } from '@core/domain/usecases/get-messages.usecase.port';
import { Inject, Injectable } from '@nestjs/common';
import { messageRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { MessageRepositoryPort } from '@core/domain/ports/persistence/message.repository.port';
import { GetMessagesFromEmailPort } from '@core/domain/ports/usecases/message/get-messages-from-email.port';
import { MessageDto } from '@core/dtos/message.dto';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';
import { Message } from '@core/domain/entities/message';

@Injectable()
export class GetMessagesUseCase implements GetMessagesUseCasePort {
  public constructor(
    @Inject(messageRepositoryPort)
    private readonly _messageRepositoryPort: MessageRepositoryPort,
  ) {}
  public async execute(payload: GetMessagesFromEmailPort): Promise<Array<MessageDto>> {
    const messages: Nullable<Array<Message>> = await this._messageRepositoryPort.findByEmail(payload.email);

    if (messages) return MessageDto.toMessageListDto(messages);

    throw Exception.new({ code: StatusCode.NOT_FOUND_DATA, data: undefined }, GetMessagesUseCase.name);
  }
}
