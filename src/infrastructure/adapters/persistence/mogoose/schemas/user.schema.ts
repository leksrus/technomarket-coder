import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ collection: 'users' })
export class UserSchema extends Document {
  @Prop({ required: true, type: String, lowercase: true })
  public email: string;
  @Prop({ required: true, type: String })
  public password: string;
  @Prop({ required: true, type: String })
  public firstName: string;
  @Prop({ required: true, type: String})
  public lastName: string;
  @Prop({ required: true, type: String})
  public address: string;
  @Prop({ required: true, type: String})
  public birthDate: string;
  @Prop({ required: true, type: String })
  public phone: string;
  @Prop({ required: true, type: String})
  public avatarUrl: string;
  @Prop({ type: String, default: null })
  public editedAt: string;
  @Prop({ type: String, default: null })
  public createdAt: string;
}


export const userSchema: mongoose.Schema<UserSchema> = SchemaFactory.createForClass(UserSchema);