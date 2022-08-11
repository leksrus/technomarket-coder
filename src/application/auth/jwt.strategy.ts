import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '@core/common/constants/jwt.constants';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@core/common/types/common-types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public validate(payload: JwtPayload): any {
    return { userId: payload.sub, username: payload.username };
  }
}
