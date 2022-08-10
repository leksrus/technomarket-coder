import { FilePort } from "@core/domain/ports/usecases/user/file.port";
import { Exclude, Expose } from "class-transformer";
import { IsDefined, IsNotEmpty } from "class-validator";

@Exclude()
export class FileAdapter implements FilePort{
  @Expose()
  @IsDefined()
  public data: Buffer | NodeJS.ReadableStream;

  @Expose()
  @IsNotEmpty()
  public name: string;
}