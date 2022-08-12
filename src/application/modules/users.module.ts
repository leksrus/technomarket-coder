import { Module } from '@nestjs/common';
import { UsersController } from '@application/controllers/users.controller';
import {
  authenticateUserUseCasePort,
  createUserUseCasePort,
  fireStoragePort,
  hashHelperPort, jwtPort, mailSenderPort,
  userRepositoryPort
} from "@core/common/constants/di-constants-tokens";
import { UserRepositoryAdapter } from '@infrastructure/adapters/persistence/mogoose/repository/user.repository.adapter';
import { HashHelperAdapter } from "@infrastructure/adapters/encryption/hash-helper.adapter";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema, UserSchema } from "@infrastructure/adapters/persistence/mogoose/schemas/user.schema";
import { CreateUserUseCase } from "@core/services/create-user.usecase";
import { FireStorageAdapter } from "@infrastructure/adapters/external/firestorage.adapter";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "@core/common/constants/jwt.constants";
import { AuthenticateUserUseCase } from "@core/services/authenticate-user.usecase";
import { JwtAdapter } from "@infrastructure/adapters/auth/jwt.adapter";
import { JwtStrategy } from "@application/auth/jwt.strategy";
import { MailSenderAdapter } from "@infrastructure/adapters/mailer/mail-sender.adapter";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: userSchema },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3h' },
    }),
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
    {
      provide: authenticateUserUseCasePort,
      useClass: AuthenticateUserUseCase,
    },
    {
      provide: jwtPort,
      useClass: JwtAdapter,
    },
    {
      provide: mailSenderPort,
      useClass: MailSenderAdapter,
    },
    JwtStrategy
  ],
})
export class UsersModule {}
