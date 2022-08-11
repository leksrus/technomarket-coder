import { ApiProperty } from "@nestjs/swagger";


export class UserHttpBody {
  @ApiProperty({ type: String, required: true })
  public readonly email: string;

  @ApiProperty({ type: String, required: true })
  public readonly password: string;

  @ApiProperty({ type: String, required: true })
  public readonly firstName: string;

  @ApiProperty({ type: String, required: true })
  public readonly lastName: string;

  @ApiProperty({ type: String, required: true })
  public readonly address: string;

  @ApiProperty({ type: String, required: true, format: 'yyyy-MM-dd' })
  public readonly birthDate: string;

  @ApiProperty({ type: String, required: true, default: '+5491122443355' })
  public readonly phone: string;
}