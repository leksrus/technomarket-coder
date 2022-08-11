import { ApiProperty } from "@nestjs/swagger";

export class AuthHttpBody {
  @ApiProperty({ type: String, required: true })
  public readonly email: string;

  @ApiProperty({ type: String, required: true })
  public readonly password: string;
}