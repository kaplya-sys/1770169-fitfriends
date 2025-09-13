import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {Prisma, PrismaClientService} from '@1770169-fitfriends/models';
import { Balance, Pagination } from '@1770169-fitfriends/types';
import {BalanceQuery} from '@1770169-fitfriends/query';

import {BalanceEntity} from './balance.entity';
import {DEFAULT_PAGE_COUNT, ELEMENTS_ON_PAGE} from './balance.constant';

@Injectable()
export class BalanceRepository extends BasePostgresRepository<BalanceEntity, Balance> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, BalanceEntity.fromObject)
  }

  private async getBalanceCount(where: Prisma.BalanceWhereInput): Promise<number> {
    return this.prismaClient.balance.count({where});
  }

  private calculateNumberPages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async create(entity: BalanceEntity): Promise<BalanceEntity> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.balance.create({
      data: prismaObject
    })
    entity.id = record.id

    return entity;
  }

  public async findByUserId(id: BalanceEntity['userId'], query?: BalanceQuery): Promise<(Pagination<BalanceEntity>)> {
    const skip = query?.page && ELEMENTS_ON_PAGE ?
      (query.page - 1) * ELEMENTS_ON_PAGE :
      Prisma.skip;
    const take = ELEMENTS_ON_PAGE;
    const where: Prisma.BalanceWhereInput = {
      userId: id,
      amount: query?.active !== undefined && query.active  ?
        {gt: 0} :
        Prisma.skip
    };
    const include: Prisma.BalanceInclude = {
      training: true
    };
    const [records, balanceCount] = await Promise.all([
      this.prismaClient.balance.findMany({where, include, take, skip}),
      this.getBalanceCount(where)
    ]);

    return {
      entities: records
        .map((record) => this.createEntityFromDocument(record))
        .filter((entity) => entity !== null),
      currentPage: query?.page || DEFAULT_PAGE_COUNT,
      totalPages: this.calculateNumberPages(balanceCount, take),
      itemsPerPage: take,
      totalItems: balanceCount
    };
  }

  public async findByTrainingId(id: BalanceEntity['trainingId']): Promise<(BalanceEntity | null)> {
    const record = await this.prismaClient.balance.findFirst({
      where: {trainingId: id},
      include: {training: true}
    });

    return this.createEntityFromDocument(record);
  }

  public override async update(id: BalanceEntity['id'], entity: BalanceEntity): Promise<BalanceEntity | null> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.balance.update({
      where: {id},
      data: prismaObject,
      include: {training: true}
    });

    return this.createEntityFromDocument(record);
  }
}
