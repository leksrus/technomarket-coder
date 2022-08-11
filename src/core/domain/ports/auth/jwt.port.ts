import { User } from "@core/domain/entities/user";
import { Auth } from "@core/domain/entities/auth";


export interface JwtPort {
  createToken(user: User): Auth;
}