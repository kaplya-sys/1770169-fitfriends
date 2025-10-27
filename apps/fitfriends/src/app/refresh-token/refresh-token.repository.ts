
import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {PrismaClientService} from '@1770169-fitfriends/models';
import {JwtToken} from '@1770169-fitfriends/types';

import {RefreshTokenEntity} from './refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<RefreshTokenEntity, JwtToken> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, RefreshTokenEntity.fromObject);
  }

  public override async save(entity: RefreshTokenEntity): Promise<RefreshTokenEntity> {
    const prismaObject = entity.toPrismaObject();
    const newRecord = await this.prismaClient.refreshSessions.create({
      data: prismaObject
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async deleteByTokenId(tokenId: string) {
    return this.prismaClient.refreshSessions.delete({
      where: {
        tokenId
      }
    });
  }

  public async findByTokenId(tokenId: string) {
    return this.prismaClient.refreshSessions.findFirst({
      where: {
        tokenId
      }
    });
  }

  public async findByUserId(userId: string) {
    return this.prismaClient.refreshSessions.findFirst({
      where: {
        userId
      }
    });
  }

  public async deleteExpiredTokens() {
    return this.prismaClient.refreshSessions.deleteMany({
      where: {
        expiresIn: {
          lt: new Date()
        }
      }
    });
  }
}
