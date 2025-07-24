
import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-guitar/core';
import {PrismaClientService} from '@1770169-guitar/models';
import {JwtToken} from '@1770169-guitar/types';

import {RefreshTokenEntity} from './refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<RefreshTokenEntity, JwtToken> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, RefreshTokenEntity.fromObject);
  }

  public async save(entity: RefreshTokenEntity): Promise<RefreshTokenEntity> {
    const newRecord = await this.prismaClient.refreshSessions.create({
      data: {
        tokenId: entity.tokenId,
        userId: entity.userId,
        expiresIn: entity.expiresIn,
        createdAt: entity.createdAt
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async deleteByTokenId(tokenId: string) {
    return this.prismaClient.refreshSessions.delete({
      where: {
        tokenId
      }
    })
  }

  public async findByTokenId(tokenId: string) {
    return this.prismaClient.refreshSessions.findFirst({
      where: {
        tokenId
      }
    })
  }

  public async deleteExpiredTokens() {
    return this.prismaClient.refreshSessions.deleteMany({
      where: {
        expiresIn: {
          lt: new Date()
        }
      }
    })
  }
}
