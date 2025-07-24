import {PassportStrategy} from '@nestjs/passport';
import {ConfigType} from '@nestjs/config';
import {Inject, Injectable} from '@nestjs/common';

import {ExtractJwt, Strategy} from 'passport-jwt';
import {JwtConfig} from '@1770169-guitar/config';
import {TokenPayload} from '@1770169-guitar/types';



@Injectable()
export class JWTAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
     @Inject(JwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof JwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.accessTokenSecret
    });
  }

  public async validate(payload: TokenPayload) {
    return payload;
  }
}
