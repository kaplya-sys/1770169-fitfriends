import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {PrismaClientService} from '@1770169-fitfriends/models';
import {Feedback} from '@1770169-fitfriends/types';

import {FeedbackEntity} from './feedback.entity';

@Injectable()
export class FeedbackRepository extends BasePostgresRepository<FeedbackEntity, Feedback> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, FeedbackEntity.fromObject)
  }

  public override async save(entity: FeedbackEntity): Promise<FeedbackEntity> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.feedback.create({
      data: prismaObject
    });
    entity.id = record.id;

    return entity;
  }

  public async find(id: string) {
    const records = await this.prismaClient.feedback.findMany({
      where: {
        trainingId: id
      },
      include: {author: true}
    });
    
    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async averageAssessment(id: string) {
    return this.prismaClient.feedback.aggregate({
      where: {
        trainingId: id
      },
      _avg: {assessment: true}
    })
  }
}
