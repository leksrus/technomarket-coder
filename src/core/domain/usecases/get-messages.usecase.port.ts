import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { GetMessagesFromEmailPort } from '@core/domain/ports/usecases/message/get-messages-from-email.port';
import { MessageDto } from '@core/dtos/message.dto';

export interface GetMessagesUseCasePort extends BaseUseCase<GetMessagesFromEmailPort, Array<MessageDto>> {}
