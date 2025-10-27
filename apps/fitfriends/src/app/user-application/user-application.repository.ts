import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {PrismaClientService} from '@1770169-fitfriends/models';
import {UserApplication} from '@1770169-fitfriends/types';

import {UserApplicationEntity} from './user-application.entity';

@Injectable()
export class UserApplicationRepository extends BasePostgresRepository<UserApplicationEntity, UserApplication> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, UserApplicationEntity.fromObject);
  }

  public override async save(entity: UserApplicationEntity): Promise<UserApplicationEntity> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.userApplication.create({
      data: prismaObject
    });
    entity.id = record.id

    return entity;
  }

  public override async update(id: UserApplicationEntity['id'], entity: UserApplicationEntity): Promise<UserApplicationEntity | null> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.userApplication.update({
      where: {
        id
      },
      data: prismaObject,
      include: {
        user: true
      }
    });

    return this.createEntityFromDocument(record);
  }

  public override async findById(id: UserApplicationEntity['id']): Promise<UserApplicationEntity | null> {
    const record = await this.prismaClient.userApplication.findFirst({
      where: {
        id
      },
      include: {
        user: true
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async findByUserIdAndInitiatorId(initiatorId: string, userId: string): Promise<(UserApplicationEntity | null)> {
    const record = await this.prismaClient.userApplication.findFirst({
      where: {
        initiatorId,
        userId
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async find(id: string): Promise<(UserApplicationEntity | null)[]> {
    const records = await this.prismaClient.userApplication.findMany({
      where: {
        OR: [
          {userId: id},
          {initiatorId: id}
        ]
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
