import { BaseEntity } from '@core/domain/entities/base.entity';
import { UserTypes } from '@core/common/enums/user-types';
import { MessageType } from '@core/domain/entities/types/message.type';

export class Message extends BaseEntity {
  private readonly _email: string;
  private readonly _userType: UserTypes;
  private readonly _message: string;
  private readonly _createdAt: Date;

  public constructor(payload: MessageType) {
    super(payload.id);
    this._email = payload.email;
    this._userType = payload.userType;
    this._message = payload.message;
    this._createdAt = payload.createdAt || new Date();
  }

  public static new(payload: MessageType): Message {
    return new Message(payload);
  }

  public get email(): string {
    return this._email;
  }

  public get userType(): UserTypes {
    return this._userType;
  }

  public get message(): string {
    return this._message;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
}
