import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { messageSchema, MessageSchema } from "@infrastructure/adapters/persistence/mogoose/schemas/message.schema";
import {
  createMessageUseCasePort,
  getMessagesUseCasePort,
  messageRepositoryPort
} from "@core/common/constants/di-constants-tokens";
import {
  MessageRepositoryAdapter
} from "@infrastructure/adapters/persistence/mogoose/repository/message.repository.adapter";
import { CreateMessageUseCase } from "@core/services/create-message.usecase";
import { GetMessagesUseCase } from "@core/services/get-messages.usecase";

@Module({
  imports: [MongooseModule.forFeature([{ name: MessageSchema.name, schema: messageSchema }])],
  controllers: [],
  providers: [
    {
      provide: messageRepositoryPort,
      useClass: MessageRepositoryAdapter,
    },
    {
      provide: createMessageUseCasePort,
      useClass: CreateMessageUseCase,
    },
    {
      provide: getMessagesUseCasePort,
      useClass: GetMessagesUseCase,
    },
  ],
})
export class MessageModule {}
