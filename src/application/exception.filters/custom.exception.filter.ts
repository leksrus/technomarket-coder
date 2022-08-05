import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '@core/common/exceptions/api-response/error-response';
import { StatusCode } from '@core/common/codes/status-code';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly _logger: Logger = new Logger(CustomExceptionFilter.name);
  public catch(exception: Error, host: ArgumentsHost): void {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();
    const status: number = exception instanceof HttpException ? exception.getStatus() : StatusCode.INTERNAL_SERVER_ERROR.code;
    const errorResponse: ErrorResponse<unknown> = this.handleCoreException(exception, request.url);

    this._logger.error(`... Error: ${JSON.stringify(errorResponse)} ...`);
    response.status(status).json(errorResponse);
  }

  private handleCoreException(error: Error, instance: string): ErrorResponse<unknown> {
    if (error instanceof HttpException)
      return ErrorResponse.new(
        {
          title: error.message,
          status: error.getStatus(),
          instance: instance,
        },
        error.getResponse(),
      );

    return ErrorResponse.new(
      {
        title: error.message,
        status: StatusCode.INTERNAL_SERVER_ERROR.code,
        instance: instance,
      },
      Object.assign({
        context: { code: 500, message: error.stack },
      }),
    );
  }
}
