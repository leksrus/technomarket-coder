import { User } from "@core/domain/entities/user";
import { Nullable } from "@core/common/types/common-types";


export interface UserRepositoryPort {
  add(user: User): Promise<User>;

  checkIfExist(email: string): Promise<boolean>;

  find(email: string): Promise<Nullable<User>>
}