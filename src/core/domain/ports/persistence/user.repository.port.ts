import { User } from "@core/domain/entities/user";


export interface UserRepositoryPort {
  add(user: User): Promise<User>;
}