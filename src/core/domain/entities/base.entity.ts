

export abstract class BaseEntity {
  private readonly _id: string;

  protected constructor(id: string) {
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  protected formatNumber(number: number, minimumFractionDigits: number): string {
    if (number) return number.toLocaleString('es-AR', { minimumFractionDigits: minimumFractionDigits, maximumFractionDigits: 2 });

    return undefined;
  }
}