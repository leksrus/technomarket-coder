import { CreateMessageUseCasePort } from '@core/domain/usecases/create-message.usecase.port';
import { Inject, Injectable } from '@nestjs/common';
import { CreateMessagePort } from '@core/domain/ports/usecases/message/create-message.port';
import { MessageDto } from '@core/dtos/message.dto';
import { messageRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { MessageRepositoryPort } from '@core/domain/ports/persistence/message.repository.port';
import { Message } from '@core/domain/entities/message';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';

@Injectable()
export class CreateMessageUseCase implements CreateMessageUseCasePort {
  public constructor(
    @Inject(messageRepositoryPort)
    private readonly _messageRepositoryPort: MessageRepositoryPort,
  ) {}
  public async execute(payload: CreateMessagePort): Promise<MessageDto> {
    const message: Message = Message.new({
      email: payload.email,
      userType: payload.userType,
      message: payload.message,
    });

    const newMessage: Nullable<Message> = await this._messageRepositoryPort.add(message);

    if (newMessage) return MessageDto.toMessageDto(newMessage);

    throw Exception.new(
      {
        code: StatusCode.INTERNAL_SERVER_ERROR,
        data: undefined,
      },
      CreateMessageUseCase.name,
    );
  }
}
