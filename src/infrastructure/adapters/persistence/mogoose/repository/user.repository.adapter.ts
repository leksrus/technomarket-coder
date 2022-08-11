import { UserRepositoryPort } from '@core/domain/ports/persistence/user.repository.port';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/user.schema';
import { Model } from 'mongoose';
import { User } from '@core/domain/entities/user';
import { Nullable } from '@core/common/types/common-types';
import { UserMapper } from '@infrastructure/adapters/persistence/mogoose/mappers/user.mapper';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  public constructor(@InjectModel(UserSchema.name) private _userModel: Model<UserSchema>) {}

  public async add(user: User): Promise<User> {
    let domainEntity: Nullable<User> = null;

    const newUserModel: UserSchema = new this._userModel(UserMapper.fromDomainToNewModel(user));

    const response: Nullable<UserSchema> = await newUserModel.save();

    if (response) domainEntity = UserMapper.toDomainEntity(response);

    return domainEntity;
  }

  public async checkIfExist(email: string): Promise<boolean> {
    return !!(await this._userModel
      .exists({
        email: email,
      })
      .exec());
  }

  public async find(email: string): Promise<Nullable<User>> {
    let userDomainEntity: Nullable<User> = null;
    const userModel: Nullable<UserSchema> = await this._userModel
      .findOne({
        email,
      })
      .exec();

    if (userModel) userDomainEntity = UserMapper.toDomainEntity(userModel);

    return userDomainEntity;
  }
}
