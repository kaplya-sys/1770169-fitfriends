import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {Prisma, PrismaClientService} from '@1770169-fitfriends/models';
import {Order, Pagination} from '@1770169-fitfriends/types';
import {OrdersQuery} from '@1770169-fitfriends/query';

import {OrderEntity} from './order.entity';
import {DEFAULT_PAGE_COUNT, ELEMENTS_ON_PAGE} from './order.constant';

@Injectable()
export class OrderRepository extends BasePostgresRepository<OrderEntity, Order> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, OrderEntity.fromObject)
  }

  private async getOrderCount(where: Prisma.OrderWhereInput): Promise<number> {
    return this.prismaClient.order.count({where});
  }

  private calculateNumberPages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(entity: OrderEntity): Promise<OrderEntity> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.order.create({
      data: prismaObject
    });
    entity.id = record.id

    return entity;
  }

  public async find(query?: OrdersQuery): Promise<Pagination<OrderEntity>> {
    const skip = query?.page && ELEMENTS_ON_PAGE ?
      (query.page - 1) * ELEMENTS_ON_PAGE :
      Prisma.skip;
    const take = ELEMENTS_ON_PAGE;
    const where: Prisma.OrderWhereInput = {
      training: {
        coachId: query?.userId !== undefined ? query.userId : Prisma.skip
      }
    };
    const orderBy: Prisma.OrderOrderByWithRelationInput[] = [
      {amount: query?.orderByAmount !== undefined ? query.orderByAmount : Prisma.skip},
      {count: query?.orderByCount !== undefined ? query.orderByCount : Prisma.skip}
    ];

    const [records, orderCount] = await Promise.all([
      this.prismaClient.order.findMany({where, orderBy, take, skip}),
      this.getOrderCount(where)
    ]);

    return {
      entities: records
        .map((record) => this.createEntityFromDocument(record))
        .filter((entity) => entity !== null),
      currentPage: query?.page || DEFAULT_PAGE_COUNT,
      totalPages: this.calculateNumberPages(orderCount, take),
      itemsPerPage: take,
      totalItems: orderCount
    };
  }

  public override async findById(id: OrderEntity['id']): Promise<OrderEntity | null> {
      const record = await this.prismaClient.order.findFirst({
        where: {
          id
        }
      });

      return this.createEntityFromDocument(record);
    }
}
