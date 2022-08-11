import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { UserDto } from '@core/dtos/user.dto';
import { CreateUserPort } from "@core/domain/ports/usecases/user/create-user.port";

export interface CreateUserUseCasePort extends BaseUseCase<CreateUserPort, UserDto> {}
