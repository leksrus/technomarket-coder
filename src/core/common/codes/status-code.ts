import { HttpStatus } from '@nestjs/common';
import { CodeDescription } from '@core/common/types/common-types';

/* eslint-disable */
export class StatusCode {
  public static OK: CodeDescription = {
    code: HttpStatus.OK,
    message: 'Success.',
  };

  public static BAD_REQUEST_ERROR: CodeDescription = {
    code: HttpStatus.BAD_REQUEST,
    message: 'Bad request.',
  };

  public static NO_CONTENT: CodeDescription = {
    code: HttpStatus.NO_CONTENT,
    message: 'No content.',
  };

  public static NOT_FOUND_DATA: CodeDescription = {
    code: HttpStatus.NOT_FOUND,
    message: 'Data not found.',
  };

  public static UNAUTHORIZED: CodeDescription = {
    code: HttpStatus.UNAUTHORIZED,
    message: 'Invalid token',
  };

  public static INTERNAL_SERVER_ERROR: CodeDescription = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  };

  public static USE_CASE_PORT_VALIDATION_ERROR: CodeDescription = {
    code: 1000,
    message: 'Use-case port validation error.',
  };

  public static FIRESTORE_FILE_UPLOAD_ERROR: CodeDescription = {
    code: 1001,
    message: 'Upload file error',
  };

}
