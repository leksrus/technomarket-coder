import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "@core/common/constants/jwt.constants";
import { PassportStrategy } from "@nestjs/passport";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}