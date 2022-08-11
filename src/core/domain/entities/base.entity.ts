

export class BaseEntity {
  private readonly _id: string;

  public constructor(id: string) {
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }
}