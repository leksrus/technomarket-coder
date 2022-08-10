import { Exception } from '@core/common/exceptions/exception';
import { ClassValidator } from '@core/common/utils/class.validator/class.validator';
import { ClassValidationDetails, Optional } from "@core/common/types/common-types";
import { StatusCode } from "@core/common/codes/status-code";

export class UseCaseValidatableAdapter {
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this, StatusCode.USE_CASE_PORT_VALIDATION_ERROR);

    if (details) throw Exception.new({ code: StatusCode.BAD_REQUEST_ERROR, data: details });
  }
}
