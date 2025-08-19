import {Injectable} from "@nestjs/common";

import {BasePostgresRepository} from "@1770169-fitfriends/core";
import {PrismaClientService} from "@1770169-fitfriends/models";
import {Balance} from "@1770169-fitfriends/types";

import {BalanceEntity} from "./balance.entity";

@Injectable()
export class BalanceRepository extends BasePostgresRepository<BalanceEntity, Balance> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, BalanceEntity.fromObject)
  }

  public async create(entity: BalanceEntity): Promise<BalanceEntity> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.balance.create({
      data: prismaObject
    })
    entity.id = record.id

    return entity;
  }

  public async findByUserId(id: BalanceEntity['userId']): Promise<(BalanceEntity | null)[]> {
    const records = await this.prismaClient.balance.findMany({
      where: {userId: id},
      include: {training: true}
    });

    return records.map((record) => this.createEntityFromDocument(record));
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
      data: prismaObject
    });

    return this.createEntityFromDocument(record);
  }
}
