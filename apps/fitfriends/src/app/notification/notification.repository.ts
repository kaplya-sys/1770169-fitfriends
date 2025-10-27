import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {PrismaClientService} from '@1770169-fitfriends/models';
import {Notification, SortDirection} from '@1770169-fitfriends/types';

import {NotificationEntity} from './notification.entity';

@Injectable()
export class NotificationRepository extends BasePostgresRepository<NotificationEntity, Notification> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, NotificationEntity.fromObject)
  }

  public override async save(entity: NotificationEntity): Promise<NotificationEntity> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.notification.create({
      data: prismaObject
    });
    entity.id = record.id

    return entity;
  }

  public async find(userId: NotificationEntity['userId']): Promise<(NotificationEntity | null)[]> {
    const records = await this.prismaClient.notification.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: SortDirection.Down
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public override async findById(id: NotificationEntity['id']): Promise<(NotificationEntity | null)> {
    const record = await this.prismaClient.notification.findFirst({
      where: {
        id
      }
    });

    return this.createEntityFromDocument(record);
  }

  public override async delete(id: NotificationEntity['id']): Promise<void> {
    await this.prismaClient.notification.delete({
      where: {
        id
      }
    })
  }
}
