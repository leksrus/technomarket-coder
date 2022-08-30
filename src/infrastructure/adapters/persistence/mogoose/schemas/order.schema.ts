import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ItemSchema, itemSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/item.schema';
import { OrderStatus } from '@core/common/enums/order-status';
import { EnumMapper } from '@core/common/utils/enum.mapper/enum.mapper';

@Schema({ collection: 'orders' })
export class OrderSchema extends Document {
  @Prop({ required: true, type: Number })
  public number: number;
  @Prop({
    required: true,
    lowercase: true,
    enum: Object.values(OrderStatus),
    type: String,
    default: OrderStatus[OrderStatus.created],
    set: (enableStatus: OrderStatus) => EnumMapper.getEnumAsString(OrderStatus, enableStatus),
  })
  public status: OrderStatus;
  @Prop({ required: true, type: String, lowercase: true })
  public email: string;
  @Prop({ required: true, type: [itemSchema] })
  public items: Array<ItemSchema>;
  @Prop({ type: String })
  public createdAt: string;
}

export const orderSchema: mongoose.Schema<OrderSchema> = SchemaFactory.createForClass(OrderSchema);
