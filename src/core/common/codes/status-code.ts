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

  public static CONFLICT_ERROR: CodeDescription = {
    code: HttpStatus.CONFLICT,
    message: 'Conflict.',
  };

  public static USE_CASE_PORT_VALIDATION_ERROR: CodeDescription = {
    code: 1000,
    message: 'Use-case port validation error.',
  };

  public static FIRESTORE_FILE_UPLOAD_ERROR: CodeDescription = {
    code: 1001,
    message: 'Upload file error',
  };

  public static DUPLICATE_MAIL_ERROR: CodeDescription = {
    code: 1002,
    message: 'Email already exists',
  };

  public static USER_OR_PASSWORD_ERROR: CodeDescription = {
    code: 1003,
    message: 'Incorrect user or password.',
  };

  public static ENUM_VALUE_NOT_EXIST_ERROR: CodeDescription = {
    code: 1004,
    message: 'Enum mapping error.',
  };
}
