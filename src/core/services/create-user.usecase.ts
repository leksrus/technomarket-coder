import { CreateUserUseCasePort } from '@core/domain/usecases/create-user.usecase.port';
import { UserDto } from '@core/dtos/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@core/domain/ports/persistence/user.repository.port';
import { hashHelperPort, userRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { CreateUserPort } from '@core/domain/ports/usecases/user/create-user.port';
import { HashHelperPort } from '@core/domain/ports/encryption/hash-helper.port';
import { User } from '@core/domain/entities/user';

@Injectable()
export class CreateUserUseCase implements CreateUserUseCasePort {
  public constructor(
    @Inject(userRepositoryPort)
    private readonly _userRepositoryPort: UserRepositoryPort,
    @Inject(hashHelperPort)
    private readonly _hashHelperPort: HashHelperPort,
  ) {}

  public async execute(payload: CreateUserPort): Promise<UserDto> {
    const password: string = await this._hashHelperPort.hash(payload.password);
    const user: User = User.new({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: password,
      birthDate: payload.birthDate,
      address: payload.address,
      phone: payload.phone,
      avatarUrl: 'test',
    });

    const newUser: User = await this._userRepositoryPort.add(user);

    return UserDto.toUserDto(newUser);
  }
}
