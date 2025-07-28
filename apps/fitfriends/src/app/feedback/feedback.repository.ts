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
}
