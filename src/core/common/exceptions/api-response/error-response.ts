import { ExceptionError, Nullable } from '@core/common/types/common-types';
import { HttpStatus } from '@nestjs/common';

export class ErrorResponse<TData> {
  public readonly type: string;

  public readonly title: string;

  public readonly status: number;

  public readonly details: TData;

  public readonly traceId: number;

  public readonly instance: Nullable<string>;

  public constructor(exceptionError: ExceptionError, data: TData) {
    this.type = this.getTypeSection(exceptionError.status);
    this.title = exceptionError.title;
    this.status = exceptionError.status;
    this.details = data;
    this.traceId = Date.now();
    this.instance = exceptionError.instance || null;
  }

  public static new<TData>(exceptionError: ExceptionError, data: TData): ErrorResponse<TData> {
    return new ErrorResponse(exceptionError, data);
  }

  private getTypeSection(code: number): string {
    const sections: Map<number, string> = new Map<number, string>([
      [HttpStatus.BAD_REQUEST, 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1'],
      [HttpStatus.UNAUTHORIZED, 'https://datatracker.ietf.org/doc/html/rfc7235#section-3.1'],
      [HttpStatus.NOT_FOUND, 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4'],
      [HttpStatus.INTERNAL_SERVER_ERROR, 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1'],
    ]);

    return sections.get(code) || 'No data available';
  }
}
