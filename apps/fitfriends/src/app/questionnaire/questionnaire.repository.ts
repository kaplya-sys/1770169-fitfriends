import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {Questionnaire} from '@1770169-fitfriends/types';
import {PrismaClientService} from '@1770169-fitfriends/models';

import {QuestionnaireEntity} from './questionnaire.entity';

@Injectable()
export class QuestionnaireRepository extends BasePostgresRepository<QuestionnaireEntity, Questionnaire> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, QuestionnaireEntity.fromObject)
  }

  public override async save(entity: QuestionnaireEntity): Promise<QuestionnaireEntity> {
    const prismaObject = entity.toPrismaObject();
    const newRecord = await this.prismaClient.questionnaire.create({
      data: prismaObject
    });
    entity.id = newRecord.id;

    return entity;
  }

  public override async update(id: QuestionnaireEntity['id'], entity: QuestionnaireEntity): Promise<QuestionnaireEntity | null> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.questionnaire.update({
      where: {
        id
      },
      data: prismaObject
    });
    entity.id = record.id;
    const document = {
      ...record,
      trainingTime: record.trainingTime ?? undefined,
      caloriesLose: record.caloriesLose ?? undefined,
      caloriesWaste: record.caloriesWaste ?? undefined,
      experience: record.experience ?? undefined,
      isPersonal: record.isPersonal ?? undefined
    };

    return this.createEntityFromDocument(document);
  }
}
