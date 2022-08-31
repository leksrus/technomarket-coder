import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'products' })
export class ProductSchema extends Document {
  @Prop({ required: true, type: String })
  public name: string;
  @Prop({ required: true, type: String })
  public description: string;
  @Prop({ required: true, type: String })
  public price: string;
  @Prop({ required: true, type: String })
  public category: string;
  @Prop({ required: true, type: Number })
  public stock: number;
  @Prop({ required: true, type: String, lowercase: true })
  public thumbnails: string;
  @Prop({ type: String, default: null })
  public editedAt: string;
  @Prop({ type: String })
  public createdAt: string;
}

export const productSchema: mongoose.Schema<ProductSchema> = SchemaFactory.createForClass(ProductSchema);