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

  public static ENTITY_ENGAGE_CREATE_ERROR: CodeDescription = {
    code: 1001,
    message: 'Entity creation error. There was a problem saving entity en Engage',
  };

  public static ENUM_VALUE_NOT_EXIST_ERROR: CodeDescription = {
    code: 1002,
    message: 'Enum mapping error.',
  };

  public static PRELIMINARY_COMMUNICATION_VALIDATION_ERROR: CodeDescription = {
    code: 1003,
    message: 'Preliminary communication validation error. Preliminary communication is not valid for generate communication',
  };

  public static COMMUNICATION_VALIDATION_ERROR: CodeDescription = {
    code: 1004,
    message: 'Communication validation error. Communication is not valid because of miss zip code o valid email',
  };

  public static MAPPER_VALIDATION_ERROR: CodeDescription = {
    code: 1005,
    message: 'Mapper validation error.',
  };

  public static CERTIFICATES_VALIDATION_ERROR: CodeDescription = {
    code: 1006,
    message: 'Certificates cannot be empty.',
  };
}
