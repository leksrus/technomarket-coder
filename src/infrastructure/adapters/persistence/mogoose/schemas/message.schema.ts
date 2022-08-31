import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EnumMapper } from '@core/common/utils/enum.mapper/enum.mapper';
import { UserTypes } from '@core/common/enums/user-types';

@Schema({ collection: 'messages' })
export class MessageSchema extends Document {
  @Prop({ required: true, type: String, lowercase: true })
  public email: string;
  @Prop({
    required: true,
    lowercase: true,
    enum: Object.values(UserTypes),
    type: String,
    default: UserTypes[UserTypes.user],
    set: (userType: UserTypes) => EnumMapper.getEnumAsString(UserTypes, userType),
  })
  public userType: UserTypes;
  @Prop({ required: true, type: String })
  public message: string;
  @Prop({ type: String })
  public createdAt: string;
}

export const messageSchema: mongoose.Schema<MessageSchema> = SchemaFactory.createForClass(MessageSchema);
