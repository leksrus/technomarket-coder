import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


@Schema()
export class ItemSchema extends Document {
  @Prop({ required: true, type: String })
  public name: string;
  @Prop({ required: true, type: String })
  public description: string;
  @Prop({ required: true, type: String })
  public category: string;
  @Prop({ required: true, type: String })
  public price: string;
  @Prop({ required: true, type: String, lowercase: true })
  public thumbnails: string;
  @Prop({ required: true, type: Number })
  public quantity: number;
}

export const itemSchema: mongoose.Schema<ItemSchema> = SchemaFactory.createForClass(ItemSchema);