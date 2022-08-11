import { UseCaseValidatableAdapter } from "@core/common/adapters/usecase/usecase.validatable.adapter";
import { AuthenticatePort } from "@core/domain/ports/usecases/user/authenticate.port";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class AuthenticateAdapter extends UseCaseValidatableAdapter implements AuthenticatePort{
  @Expose()
  @IsNotEmpty()
  public email: string;

  @Expose()
  @IsNotEmpty()
  public password: string;


  public static async new(payload: AuthenticatePort): Promise<AuthenticateAdapter> {
    const adapter: AuthenticateAdapter = plainToClass(AuthenticateAdapter, payload);
    await adapter.validate();

    return adapter
  }
}