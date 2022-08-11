import { AuthenticateUserUseCasePort } from '@core/domain/usecases/authenticate-user.usecase.port';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticatePort } from '@core/domain/ports/usecases/user/authenticate.port';
import { hashHelperPort, jwtPort, userRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { UserRepositoryPort } from '@core/domain/ports/persistence/user.repository.port';
import { JwtPort } from '@core/domain/ports/auth/jwt.port';
import { User } from '@core/domain/entities/user';
import { HashHelperPort } from '@core/domain/ports/encryption/hash-helper.port';
import { Exception } from "@core/common/exceptions/exception";
import { StatusCode } from "@core/common/codes/status-code";
import { Auth } from "@core/domain/entities/auth";
import { AuthDto } from "@core/dtos/auth.dto";

@Injectable()
export class AuthenticateUserUseCase implements AuthenticateUserUseCasePort {
  public constructor(
    @Inject(userRepositoryPort)
    private readonly _userRepositoryPort: UserRepositoryPort,
    @Inject(hashHelperPort)
    private readonly _hashHelperPort: HashHelperPort,
    @Inject(jwtPort)
    private readonly _jwtPort: JwtPort,
  ) {}

  public async execute(payload: AuthenticatePort): Promise<AuthDto> {
    const user: User = await this._userRepositoryPort.find(payload.email);

    if (user && (await this._hashHelperPort.compare(payload.password, user.password))){
      const auth: Auth = this._jwtPort.createToken(user);

      return AuthDto.toAuthDto(auth);
    }

    throw Exception.new({ code: StatusCode.BAD_REQUEST_ERROR, data: StatusCode.USER_OR_PASSWORD_ERROR }, AuthenticateUserUseCase.name);
  }
}
