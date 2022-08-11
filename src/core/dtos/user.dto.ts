import { Exclude, Expose, plainToClass, Transform, Type } from "class-transformer";
import { User } from "@core/domain/entities/user";


@Exclude()
export class UserDto {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Exclude()
  public password: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;

  @Expose()
  public address: string;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value as Date).toLocaleString())
  public birthDate: Date;

  @Expose()
  public phone: string;

  @Expose()
  public avatarUrl: string;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value as Date)?.toLocaleString())
  public editedAt: Date;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value as Date).toLocaleString())
  public createdAt: Date;

  public static toUserDto(user: User): UserDto {
    return plainToClass(UserDto, user);
  }
}