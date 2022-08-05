import { StatusCode } from '@core/common/codes/status-code';
import { BaseValidatableAdapter } from '@core/common/adapters/base-validatable.adapter';

export class UsecaseValidatableAdapter extends BaseValidatableAdapter {
  public async validate(): Promise<void> {
    await super.validate(StatusCode.USE_CASE_PORT_VALIDATION_ERROR)
  }
}
