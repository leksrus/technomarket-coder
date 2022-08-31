import { OrderStatus } from '@core/common/enums/order-status';
import { ItemHttpBody } from '@application/documentation/item.http.body';
import { ApiProperty } from '@nestjs/swagger';

export class OrderHttpBody {
  @ApiProperty({ enum: OrderStatus, default: OrderStatus[OrderStatus.created] })
  public status?: OrderStatus;
  @ApiProperty({ type: String, required: true })
  public email: string;
  @ApiProperty({ type: Array, required: true })
  public items: Array<ItemHttpBody>;
}
