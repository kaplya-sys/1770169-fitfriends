import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {Prisma, PrismaClientService} from '@1770169-fitfriends/models';
import {ExtendUser, Pagination} from '@1770169-fitfriends/types';
import {UsersQuery} from '@1770169-fitfriends/query';

import {UserEntity} from './user.entity';
import {DEFAULT_PAGE_COUNT, ELEMENTS_ON_PAGE} from './user.constant';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, ExtendUser> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, UserEntity.fromObject);
  }

  private async getUserCount(where: Prisma.UserWhereInput): Promise<number> {
    return this.prismaClient.user.count({where});
  }

  private calculateNumberPages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
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

  public async find(query?: UsersQuery): Promise<Pagination<UserEntity>> {
    const skip = query?.page && ELEMENTS_ON_PAGE ?
      (query.page - 1) * ELEMENTS_ON_PAGE :
      Prisma.skip;
    const take = ELEMENTS_ON_PAGE;
    const where: Prisma.UserWhereInput = {
      location: query?.location?.length ? {
        in: query.location
      } : Prisma.skip,
      role: query?.role !== undefined ? query.role : Prisma.skip,
      questionnaire: {
        fitnessLevel: query?.fitnessLevel !== undefined ? query.fitnessLevel : Prisma.skip,
        exercises: query?.type?.length ? {
          hasSome: query.type
        } : Prisma.skip
      }
    };
    const include: Prisma.UserInclude = {questionnaire: true}

    const [records, userCount] = await Promise.all([
      this.prismaClient.user.findMany({where, include, take, skip}),
      this.getUserCount(where)
    ]);

    return {
      entities: records
        .map((record) => this.createEntityFromDocument(record))
        .filter((entity) => entity !== null),
      currentPage: query?.page || DEFAULT_PAGE_COUNT,
      totalPages: this.calculateNumberPages(userCount, take),
      itemsPerPage: take,
      totalItems: userCount
    };
  }

  public override async delete(id: UserEntity['id']): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id
      }
    });
  }
}

