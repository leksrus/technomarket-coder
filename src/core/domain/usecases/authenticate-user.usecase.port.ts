import { BaseUseCase } from '@core/common/usecase/base.usecase';
import { AuthenticatePort } from '@core/domain/ports/usecases/user/authenticate.port';
import { AuthDto } from "@core/dtos/auth.dto";

export interface AuthenticateUserUseCasePort extends BaseUseCase<AuthenticatePort, AuthDto> {}
