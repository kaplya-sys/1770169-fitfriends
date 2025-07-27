import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {Prisma, PrismaClientService} from '@1770169-fitfriends/models';
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
    const newRecord = await this.prismaClient.user.create({
      data: {
        name: entity.name,
        email: entity.email,
        password: entity.password,
        gender: entity.gender,
        birthday: entity.birthday ?? Prisma.skip,
        location: entity.location,
        role: entity.role
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public override async update(id: UserEntity['id'], entity: UserEntity): Promise<UserEntity> {
    const record = await this.prismaClient.user.update({
      where: {
        id
      },
      data: entity.toObject()
    })

    return this.createEntityFromDocument(record);
  }

  public override async findById(id: UserEntity['id']): Promise<UserEntity | null> {
    const record = await this.prismaClient.user.findFirst({
      where: {
        id
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const record = await this.prismaClient.user.findFirst({
      where: {
        email
      }
    })

    return this.createEntityFromDocument(record);
  }
}

