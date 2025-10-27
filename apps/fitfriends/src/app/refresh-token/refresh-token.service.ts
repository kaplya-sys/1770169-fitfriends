import dayjs from 'dayjs';
import {ConfigType} from '@nestjs/config';
import {Inject, Injectable, NotFoundException} from '@nestjs/common';

import {JwtConfig} from '@1770169-fitfriends/config';
import {createMessage, parseTime} from '@1770169-fitfriends/helpers';
import {RefreshTokenPayload} from '@1770169-fitfriends/types';

import {RefreshTokenRepository} from './refresh-token.repository';
import {RefreshTokenEntity} from './refresh-token.entity';
import {NOT_FOUND_BY_USER_MESSAGE} from './refresh-token.constant';

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
    await this.refreshTokenRepository.deleteByTokenId(tokenId);

    return this.deleteExpiredRefreshTokens();
  }

  public async isExists(tokenId: string) {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);

    return (refreshToken !== null);
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }

  public async deleteRefreshSessionByUserId(userId: string) {
    const existToken = await this.refreshTokenRepository.findByUserId(userId);

    if (!existToken) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_USER_MESSAGE, [userId]));
    }

    return this.deleteRefreshSession(existToken.tokenId);
  }
}
