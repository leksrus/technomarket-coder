import { FilePort } from "@core/domain/ports/usecases/user/file.port";
import { Exclude, Expose } from "class-transformer";
import { IsDefined, IsIn, IsNotEmpty } from "class-validator";

@Exclude()
export class FileAdapter implements FilePort{
  @Expose()
  @IsDefined()
  public data: Buffer;

  @Expose()
  @IsNotEmpty()
  public name: string;

  @Expose()
  @IsNotEmpty()
  @IsIn(['.jpg', '.jpeg', '.png'])
  public extension: string;
}