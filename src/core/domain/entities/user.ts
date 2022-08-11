import { BaseEntity } from "@core/domain/entities/base.entity";
import { UserType } from "@core/domain/entities/types/user.type";
import { Nullable } from "@core/common/types/common-types";


export class User extends BaseEntity{
  private readonly _email: string;
  private readonly _password: string;
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _address: string;
  private readonly _birthDate: string;
  private readonly _phone: string;
  private readonly _avatarUrl: string;
  private readonly _createdAt: Nullable<Date>;
  private _editedAt: Nullable<Date>;

  public constructor(payload: UserType) {
    super(payload.id);
    this._email = payload.email;
    this._password = payload.password;
    this._firstName = payload.firstName;
    this._lastName = payload.lastName;
    this._address = payload.address;
    this._birthDate = payload.birthDate;
    this._phone = payload.phone;
    this._avatarUrl = payload.avatarUrl;
    this._createdAt = payload.createdAt || new Date();
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get address(): string {
    return this._address;
  }

  public get birthDate(): string {
    return this._birthDate;
  }

  public get phone(): string {
    return this._phone;
  }

  public get avatarUrl(): string {
    return this._avatarUrl;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get editedAt(): Nullable<Date> {
    return this._editedAt;
  }

  public static new(payload: UserType): User {
    return new User(payload);
  }
}