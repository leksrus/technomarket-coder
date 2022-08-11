import { UserSchema } from "@infrastructure/adapters/persistence/mogoose/schemas/user.schema";
import { User } from "@core/domain/entities/user";


export class UserMapper {
  public static toDomainEntity(userModel: UserSchema): User {
    return User.new({
      id: userModel._id.toString(),
      email: userModel.email,
      password: userModel.password,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      address: userModel.address,
      birthDate: userModel.birthDate,
      phone: userModel.phone,
      avatarUrl: userModel.avatarUrl,
      createdAt: new Date(userModel.createdAt),
      editedAt: new Date(userModel.editedAt)
    });
  }

  public static fromDomainToNewModel(user: User): any {
    return Object.assign({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      birthDate: user.birthDate,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      editedAt: user.editedAt
    })
  }
}