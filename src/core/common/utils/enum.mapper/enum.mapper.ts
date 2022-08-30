import { StatusCode } from '@core/common/codes/status-code';
import { Exception } from '@core/common/exceptions/exception';

export class EnumMapper {
  public static getEnumAsString<TEnum extends Record<any, any>, K extends string | number | undefined>(enumObject: TEnum, key: K): string {
    if (typeof key === 'string') return enumObject[enumObject[key]] as string;

    if (typeof key === 'number') return enumObject[key] as string;

    throw Exception.new({ code: StatusCode.INTERNAL_SERVER_ERROR, data: StatusCode.ENUM_VALUE_NOT_EXIST_ERROR });
  }

  public static getEnumAsNumber<TEnum extends Record<any, any>, K extends string | number | undefined>(enumObject: TEnum, key: K): number {
    if (typeof key === 'string') return enumObject[key] as number;

    if (typeof key === 'number') return key;

    throw Exception.new({ code: StatusCode.INTERNAL_SERVER_ERROR, data: StatusCode.ENUM_VALUE_NOT_EXIST_ERROR });
  }
}
