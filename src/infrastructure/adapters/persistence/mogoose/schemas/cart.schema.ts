import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { itemSchema, ItemSchema } from "@infrastructure/adapters/persistence/mogoose/schemas/item.schema";


@Schema({ collection: 'carts' })
export class CartSchema extends Document {
  @Prop({ required: true, type: String })
  public email: string;
  @Prop({ required: true, type: String })
  public orderAddress: string;
  @Prop({required: false, type: [itemSchema] })
  public items: Array<ItemSchema>;
  @Prop({ type: String, default: null })
  public editedAt: string;
  @Prop({ type: String })
  public createdAt: string;
}

export const cartSchema: mongoose.Schema<CartSchema> = SchemaFactory.createForClass(CartSchema);