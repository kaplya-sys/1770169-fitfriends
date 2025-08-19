import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {PrismaClientService} from '@1770169-fitfriends/models';
import {Order} from '@1770169-fitfriends/types';

import {OrdersEntity} from './orders.entity';

@Injectable()
export class OrdersRepository extends BasePostgresRepository<OrdersEntity, Order> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, OrdersEntity.fromObject)
  }

  public override async save(entity: OrdersEntity): Promise<OrdersEntity> {
      const prismaObject = entity.toPrismaObject();
      const record = await this.prismaClient.order.create({
        data: prismaObject
      });
      entity.id = record.id

      return entity;
    }
}
