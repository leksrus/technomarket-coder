import { MessageSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/message.schema';
import { Message } from '@core/domain/entities/message';

export class MessageMapper {
  public static toDomainEntity(messageModel: MessageSchema): Message {
    return Message.new({
      id: messageModel._id.toString(),
      email: messageModel.email,
      message: messageModel.message,
      createdAt: new Date(messageModel.createdAt),
    });
  }

  public static toDomainListEntities(ormProducts: Array<MessageSchema>): Array<Message> {
    return ormProducts.map((x) => this.toDomainEntity(x));
  }

  public static fromDomainToNewModel(product: Message): any {
    return Object.assign({
      email: product.email,
      message: product.message,
      createdAt: product.createdAt,
    });
  }
}
