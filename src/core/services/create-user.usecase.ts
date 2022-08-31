import { CreateUserUseCasePort } from '@core/domain/usecases/create-user.usecase.port';
import { UserDto } from '@core/dtos/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@core/domain/ports/persistence/user.repository.port';
import { fireStoragePort, hashHelperPort, mailSenderPort, userRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { CreateUserPort } from '@core/domain/ports/usecases/user/create-user.port';
import { HashHelperPort } from '@core/domain/ports/encryption/hash-helper.port';
import { User } from '@core/domain/entities/user';
import { FireStoragePort } from '@core/domain/ports/external/firestorage.port';
import { StatusCode } from '@core/common/codes/status-code';
import { Exception } from '@core/common/exceptions/exception';
import { MailSenderPort } from '@core/domain/ports/mailer/mail-sender.port';

@Injectable()
export class CreateUserUseCase implements CreateUserUseCasePort {
  public constructor(
    @Inject(userRepositoryPort)
    private readonly _userRepositoryPort: UserRepositoryPort,
    @Inject(hashHelperPort)
    private readonly _hashHelperPort: HashHelperPort,
    @Inject(fireStoragePort)
    private readonly _fireStoragePort: FireStoragePort,
    @Inject(mailSenderPort)
    private readonly _mailSenderPort: MailSenderPort,
  ) {}

  public async execute(payload: CreateUserPort): Promise<UserDto> {
    const isMailExist: boolean = await this._userRepositoryPort.checkIfExist(payload.email);

    if (!isMailExist) throw Exception.new({ code: StatusCode.CONFLICT_ERROR, data: StatusCode.DUPLICATE_MAIL_ERROR }, CreateUserUseCase.name);

    const password: string = await this._hashHelperPort.hash(payload.password);
    const avatarUrl: string = await this._fireStoragePort.addFile(payload.avatarFile, 'avatars/');

    if (avatarUrl) {
      const user: User = User.new({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: password,
        birthDate: payload.birthDate,
        address: payload.address,
        phone: payload.phone,
        avatarUrl: avatarUrl,
      });

      const newUser: User = await this._userRepositoryPort.add(user);
      const subject: string = `User ${newUser.email} Registration`;
      const mailBody: string = this.getMailBody(newUser);
      await this._mailSenderPort.sendEmail(subject, mailBody);

      return UserDto.toUserDto(newUser);
    }

    throw Exception.new({ code: StatusCode.INTERNAL_SERVER_ERROR, data: StatusCode.FIRESTORE_FILE_UPLOAD_ERROR }, CreateUserUseCase.name);
  }

  private getMailBody(user: User): string {
    return `<b>New account created -> email: ${user.email}, firstname: ${user.firstName}, lastname: ${user.lastName}, address: ${user.address}, phone: ${user.phone}</b>`;
  }
}
