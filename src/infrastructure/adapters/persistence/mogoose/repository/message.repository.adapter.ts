import { MessageRepositoryPort } from '@core/domain/ports/persistence/message.repository.port';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '@core/domain/entities/message';
import { Nullable } from '@core/common/types/common-types';
import { MessageSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/message.schema';
import { MessageMapper } from '@infrastructure/adapters/persistence/mogoose/mappers/message.mapper';

@Injectable()
export class MessageRepositoryAdapter implements MessageRepositoryPort {
  public constructor(@InjectModel(MessageSchema.name) private _messageModel: Model<MessageSchema>) {}

  public async add(message: Message): Promise<Nullable<Message>> {
    let domainEntity: Nullable<Message> = null;

    const newMessageModel: MessageSchema = new this._messageModel(MessageMapper.fromDomainToNewModel(message));

    const response: Nullable<MessageSchema> = await newMessageModel.save();

    if (response) domainEntity = MessageMapper.toDomainEntity(response);

    return domainEntity;
  }

  public async findByEmail(email: string): Promise<Nullable<Array<Message>>> {
    let domainEntities: Nullable<Array<Message>> = null;

    const mongoModel: Nullable<Array<MessageSchema>> = await this._messageModel
      .find({
        email,
      })
      .exec();

    if (mongoModel) domainEntities = MessageMapper.toDomainListEntities(mongoModel);

    return domainEntities;
  }
}
