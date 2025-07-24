import {Inject, Injectable} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

import {JwtConfig} from '@1770169-guitar/config';
import {RefreshTokenPayload} from '@1770169-guitar/types';

import {AuthService} from '../auth.service';
import {RefreshTokenService} from '../../refresh-token/refresh-token.service';
import {TokenNotExistsExceptions} from '../exceptions/token-not-exists.exception';

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(JwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof JwtConfig>,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    })
  }

  public async validate(payload: RefreshTokenPayload) {
    if(!await this.refreshTokenService.isExists(payload.tokenId)) {
      throw new TokenNotExistsExceptions(payload.tokenId)
    }
    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);

    return this.authService.getUserByEmail(payload.email);
  }
}
