import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-guitar/core';
import {Prisma, PrismaClientService} from '@1770169-guitar/models';
import {ExtendUser} from '@1770169-guitar/types';

import {UserEntity} from './user.entity';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, ExtendUser> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, UserEntity.fromObject);
  }

  public async save(entity: UserEntity): Promise<UserEntity> {
    const newRecord = await this.prismaClient.user.create({
      data: {
        name: entity.name,
        email: entity.email,
        password: entity.password,
        role: entity.role ?? Prisma.skip,
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async findById(id: UserEntity['id']): Promise<UserEntity | null> {
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

