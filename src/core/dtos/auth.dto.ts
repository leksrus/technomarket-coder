import { Exclude, Expose, plainToClass } from "class-transformer";
import { Auth } from "@core/domain/entities/auth";

@Exclude()
export class AuthDto {
  @Expose()
  public token: string;

  @Expose()
  public creationAt: Date;

  public static toAuthDto(auth: Auth): AuthDto {
    return plainToClass(AuthDto, auth);
  }
}