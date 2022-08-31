import { Nullable } from '@core/common/types/common-types';
import { ApiProperty } from '@nestjs/swagger';
import { ItemHttpBody } from '@application/documentation/item.http.body';

export class CartHttpBody {
  @ApiProperty({ type: String, required: true })
  public email: string;
  @ApiProperty({ type: String, required: true })
  public orderAddress: string;
  @ApiProperty({ type: Array, required: false })
  public items?: Nullable<Array<ItemHttpBody>>;
}
