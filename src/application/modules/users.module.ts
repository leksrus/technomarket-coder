import { Module } from '@nestjs/common';
import { UsersController } from '@application/controllers/users.controller';
import {
  createUserUseCasePort,
  fireStoragePort,
  hashHelperPort,
  userRepositoryPort
} from "@core/common/constants/di-constants-tokens";
import { UserRepositoryAdapter } from '@infrastructure/adapters/persistence/mogoose/repository/user.repository.adapter';
import { HashHelperAdapter } from "@infrastructure/adapters/encryption/hash-helper.adapter";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema, UserSchema } from "@infrastructure/adapters/persistence/mogoose/schemas/user.schema";
import { CreateUserUseCase } from "@core/services/create-user.usecase";
import { FireStorageAdapter } from "@infrastructure/adapters/external/firestorage.adapter";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: userSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: userRepositoryPort,
      useClass: UserRepositoryAdapter,
    },
    {
      provide: createUserUseCasePort,
      useClass: CreateUserUseCase,
    },
    {
      provide: hashHelperPort,
      useClass: HashHelperAdapter,
    },
    {
      provide: fireStoragePort,
      useClass: FireStorageAdapter,
    },
  ],
})
export class UsersModule {}
