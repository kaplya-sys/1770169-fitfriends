import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {PrismaClientService, Role} from '@1770169-fitfriends/models';
import {ExtendUser} from '@1770169-fitfriends/types';
import {UsersQuery} from '@1770169-fitfriends/query';

import {UserEntity} from './user.entity';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, ExtendUser> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, UserEntity.fromObject);
  }

  public override async save(entity: UserEntity): Promise<UserEntity> {
    const prismaObject = entity.toPrismaObject();
    const newRecord = await this.prismaClient.user.create({
      data: prismaObject
    });
    entity.id = newRecord.id;

    return entity;
  }

  public override async update(id: UserEntity['id'], entity: UserEntity): Promise<UserEntity | null> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.user.update({
      where: {
        id
      },
      data: prismaObject,
      include: {
        questionnaire: true
      }
    })

    return this.createEntityFromDocument(record);
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

    return this.createEntityFromDocument(record);
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

    return this.createEntityFromDocument(record);
  }

  public async findByRole(query: UsersQuery): Promise<(UserEntity | null)[]> {
    const records = await this.prismaClient.user.findMany({
      where: {
        role: query.role ?? Role.user
      },
      include: {
        questionnaire: true
      }
    })

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public override async delete(id: UserEntity['id']): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id
      }
    });
  }
}

