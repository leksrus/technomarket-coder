import { CodeDescription, CreateExceptionPayload } from '@core/common/types/common-types';
import { HttpException, Logger } from '@nestjs/common';

export class Exception<TData> extends HttpException {
  private constructor(codeDescription: CodeDescription, data?: TData, context?: string) {
    super(data || codeDescription.message, codeDescription.code);

    this._logger = new Logger(context ? context : Exception.name);

    this._logger.error(`... Error: ${JSON.stringify(codeDescription)} | Data: ${JSON.stringify(data)} ...`);
  }

  private readonly _logger: Logger;

  public static new<TData>(payload: CreateExceptionPayload<TData>, context?: string): Exception<TData> {
    return new Exception(payload.code, payload.data, context);
  }
}
