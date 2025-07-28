import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {PrismaClientService} from '@1770169-fitfriends/models';
import {ExtendUser} from '@1770169-fitfriends/types';

import {UserEntity} from './user.entity';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, ExtendUser> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, UserEntity.fromObject);
  }

  public override async save(entity: UserEntity): Promise<UserEntity> {
    const objectEntity = entity.toObject();
    const newRecord = await this.prismaClient.user.create({
      data: objectEntity
    });
    entity.id = newRecord.id;

    return entity;
  }

  public override async update(id: UserEntity['id'], entity: UserEntity): Promise<UserEntity | null> {
    const objectEntity = entity.toObject();
    const record = await this.prismaClient.user.update({
      where: {
        id
      },
      data: objectEntity,
    })
    const document = {
      ...record,
      birthday: record.birthday ?? undefined,
      description: record.description ?? undefined,
      questionnaireId: record.questionnaireId ?? undefined
    }
    return this.createEntityFromDocument(document);
  }

  public override async findById(id: UserEntity['id']): Promise<UserEntity | null> {
    const record = await this.prismaClient.user.findFirst({
      where: {
        id
      },
      include: {
        questionnaire: true
      }
    });

    if (!record) {
      return null;
    }
    const document = {
      ...record,
      birthday: record.birthday ?? undefined,
      description: record.description ?? undefined,
      questionnaireId: record.questionnaireId ?? undefined
    };

    return this.createEntityFromDocument(document);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const record = await this.prismaClient.user.findFirst({
      where: {
        email
      },
      include: {
        questionnaire: true
      }
    })

    if (!record) {
      return null;
    }
    const document = {
      ...record,
      birthday: record.birthday ?? undefined,
      description: record.description ?? undefined,
      questionnaireId: record.questionnaireId ?? undefined
    };

    return this.createEntityFromDocument(document);
  }
}

