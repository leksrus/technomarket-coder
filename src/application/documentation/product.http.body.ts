import { ApiProperty } from "@nestjs/swagger";


export class ProductHttpBody {
  @ApiProperty({ type: String, required: true })
  public readonly category: string;

  @ApiProperty({ type: String, required: true })
  public readonly description: string;

  @ApiProperty({ type: String, required: true })
  public readonly name: string;

  @ApiProperty({ type: Number, required: true, default: 0 })
  public readonly price: number;

  @ApiProperty({ type: Number, required: true, default: 0 })
  public readonly stock: number;

  @ApiProperty({ type: String, required: true })
  public readonly thumbnails: string;
}