import dayjs from 'dayjs';
import {ConfigType} from '@nestjs/config';
import {Inject, Injectable} from '@nestjs/common';

import {JwtConfig} from '@1770169-guitar/config';
import {parseTime} from '@1770169-guitar/helpers';
import {RefreshTokenPayload} from '@1770169-guitar/types';

import {RefreshTokenRepository} from './refresh-token.repository';
import {RefreshTokenEntity} from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(JwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof JwtConfig>
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const {value, unit} = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: dayjs().toDate(),
      userId: payload.sub,
      expiresIn: dayjs().add(value, unit).toDate()
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string) {
    await this.deleteExpiredRefreshTokens();

    return this.refreshTokenRepository.deleteByTokenId(tokenId)
  }

  public async isExists(tokenId: string) {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);

    return (refreshToken !== null);
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
