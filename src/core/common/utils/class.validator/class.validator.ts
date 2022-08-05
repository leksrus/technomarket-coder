import { ClassValidationDetails, CodeDescription, Optional } from '@core/common/types/common-types';
import { validate, ValidationError } from 'class-validator';

export class ClassValidator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static async validate<TTarget extends object>(target: TTarget, context?: CodeDescription): Promise<Optional<ClassValidationDetails>> {
    let details: Optional<ClassValidationDetails>;
    const errors: Array<ValidationError> = await validate(target);

    if (errors.length > 0) {
      details = {
        context: context,
        errors: [],
      };
      for (const error of errors) {
        if (error.constraints) this.pushErrors(details, error);
        else if (error.children) for (const childError of error.children) this.pushErrors(details, childError);
      }
    }

    return details;
  }

  private static pushErrors(details: ClassValidationDetails, error: ValidationError): void {
    if (error.constraints) {
      details.errors.push({
        object: error.target.constructor.name.toString(),
        property: error.property,
        value: error.value,
        message: Object.values(error.constraints),
      });
    } else {
      if (error.children) for (const childError of error.children) this.pushErrors(details, childError);
    }
  }
}
