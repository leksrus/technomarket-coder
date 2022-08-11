import { UseCaseValidatableAdapter } from '@core/common/adapters/usecase/usecase.validatable.adapter';
import { FileAdapter } from '@infrastructure/adapters/usecases/user/file.adapter';
import { IsDateString, IsDefined, IsEmail, IsNotEmpty, ValidateNested } from "class-validator";
import { Exclude, Expose, plainToClass, Type } from 'class-transformer';
import { CreateUserPort } from "@core/domain/ports/usecases/user/create-user.port";

@Exclude()
export class CreateUserAdapter extends UseCaseValidatableAdapter implements CreateUserPort {
  @Expose()
  @IsNotEmpty()
  public address: string;

  @Expose()
  @Type(() => FileAdapter)
  @ValidateNested()
  public avatarFile: FileAdapter;

  @Expose()
  @IsDefined()
  @IsDateString()
  public birthDate: string;

  @Expose()
  @IsEmail()
  public email: string;

  @Expose()
  @IsNotEmpty()
  public firstName: string;

  @Expose()
  @IsNotEmpty()
  public lastName: string;

  @Expose()
  @IsNotEmpty()
  public password: string;

  @Expose()
  @IsNotEmpty()
  public phone: string;

  public static async new(payload: CreateUserPort): Promise<CreateUserAdapter> {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
