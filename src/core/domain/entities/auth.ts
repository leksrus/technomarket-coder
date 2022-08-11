import { AuthType } from "@core/domain/entities/types/auth.type";


export class Auth {
  private readonly _token: string;
  private readonly _creationAt: Date;

  public constructor(payload: AuthType) {
    this._token = payload.token;
    this._creationAt = new Date();
  }

  public get token(): string {
    return this._token;
  }

  public get creationAt(): Date {
    return this._creationAt;
  }

  public static new(payload: AuthType): Auth {
    return new Auth(payload);
  }
}