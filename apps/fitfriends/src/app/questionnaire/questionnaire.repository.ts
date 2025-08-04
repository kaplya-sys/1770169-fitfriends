import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {Questionnaire} from '@1770169-fitfriends/types';
import {Prisma, PrismaClientService} from '@1770169-fitfriends/models';

import {QuestionnaireEntity} from './questionnaire.entity';

@Injectable()
export class QuestionnaireRepository extends BasePostgresRepository<QuestionnaireEntity, Questionnaire> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, QuestionnaireEntity.fromObject)
  }

  public override async save(entity: QuestionnaireEntity): Promise<QuestionnaireEntity> {
    const objectEntity = entity.toObject();
    const newRecord = await this.prismaClient.questionnaire.create({
      data: {
        fitnessLevel: objectEntity.fitnessLevel,
        trainingTime: objectEntity.trainingTime ?? Prisma.skip,
        exercise: objectEntity.exercise,
        caloriesLose: objectEntity.caloriesLose ?? Prisma.skip,
        caloriesWaste: objectEntity.caloriesWaste ?? Prisma.skip,
        qualifications: objectEntity.qualifications ?? Prisma.skip,
        experience: objectEntity.experience ?? Prisma.skip,
        isPersonal: objectEntity.isPersonal ?? Prisma.skip
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public override async update(id: QuestionnaireEntity['id'], entity: QuestionnaireEntity): Promise<QuestionnaireEntity | null> {
    const entityObject = entity.toObject();
    const record = await this.prismaClient.questionnaire.update({
      where: {
        id
      },
      data: entityObject
    });
    entity.id = record.id;
    const document = {
      ...record,
      trainingTime: record.trainingTime ?? undefined,
      caloriesLose: record.caloriesLose ?? undefined,
      caloriesWaste: record.caloriesWaste ?? undefined,
      experience: record.experience ?? undefined,
      isPersonal: record.isPersonal ?? undefined,
    };

    return this.createEntityFromDocument(document);
  }
}
