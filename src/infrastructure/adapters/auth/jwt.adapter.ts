import { JwtPort } from "@core/domain/ports/auth/jwt.port";
import { Injectable } from "@nestjs/common";
import { User } from "@core/domain/entities/user";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@core/common/types/common-types";
import { Auth } from "@core/domain/entities/auth";

@Injectable()
export class JwtAdapter implements JwtPort {
  public constructor(
    private readonly _jwtService: JwtService
  ) {}

  public createToken(user: User): Auth {
    const jwtPayload: JwtPayload = { username: user.email, sub: user.id };

    const jwt: string = this._jwtService.sign(jwtPayload);

    return Auth.new({
      token: jwt
    });
  }

}