import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { CreateMessagePort } from '@core/domain/ports/usecases/message/create-message.port';
import { MessageDto } from '@core/dtos/message.dto';

export interface CreateMessageUseCasePort extends BaseUseCase<CreateMessagePort, MessageDto> {}
