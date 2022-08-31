import { Exclude, Expose, plainToClass, Transform, Type } from 'class-transformer';
import { UserTypes } from '@core/common/enums/user-types';
import { Message } from '@core/domain/entities/message';

@Exclude()
export class MessageDto {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public userType: UserTypes;

  @Expose()
  public message: string;

  @Expose()
  @Type(() => Date)
  @Transform(({ value }) => (value as Date).toLocaleString())
  public createdAt: Date;

  public static toMessageDto(message: Message): MessageDto {
    return plainToClass(MessageDto, message);
  }

  public static toMessageListDto(messages: Array<Message>): Array<MessageDto> {
    return messages.map((x) => this.toMessageDto(x));
  }
}
