import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {Prisma, PrismaClientService} from '@1770169-fitfriends/models';
import {Friend, Pagination} from '@1770169-fitfriends/types';

import {FriendEntity} from './friend.entity';
import {DEFAULT_PAGE_COUNT, ELEMENTS_ON_PAGE} from './friend.constant';
import {FriendsQuery} from '@1770169-fitfriends/query';

@Injectable()
export class FriendRepository extends BasePostgresRepository<FriendEntity, Friend> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, FriendEntity.fromObject);
  }

  private async getFriendCount(where: Prisma.FriendWhereInput): Promise<number> {
    return this.prismaClient.friend.count({where});
  }

  private calculateNumberPages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(entity: FriendEntity): Promise<FriendEntity> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.friend.create({
      data: prismaObject
    });
    entity.id = record.id

    return entity;
  }

  public override async update(id: FriendEntity['id'], entity: FriendEntity): Promise<FriendEntity | null> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.friend.update({
      where: {
        id
      },
      data: prismaObject,
      include: {
        friend: {
          include: {
            station: true,
            questionnaire: true
          }
        }
      }
    });

    return this.createEntityFromDocument(record);
  }

  public override async delete(id: FriendEntity['id']): Promise<void> {
    await this.prismaClient.friend.delete({
      where: {
        id
      }
    });
  }

  public async findByUserIdAndFriendId(userId: FriendEntity['userId'], friendId: FriendEntity['friendId']): Promise<FriendEntity | null> {
    const record = await this.prismaClient.friend.findFirst({
      where: {
        userId,
        friendId
      },
      include: {
        friend: {
          include: {
            station: true,
            questionnaire: true
          }
        }
      }
    });

    return this.createEntityFromDocument(record);
  }

  public override async findById(id: FriendEntity['id']): Promise<FriendEntity | null> {
    const record = await this.prismaClient.friend.findFirst({
      where: {
        id
      },
      include: {
        friend: {
          include: {
            station: true,
            questionnaire: true
          }
        }
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async findByUserId(userId: FriendEntity['userId'], query?: FriendsQuery): Promise<Pagination<FriendEntity>> {
    const skip = query?.page && ELEMENTS_ON_PAGE ?
      (query.page - 1) * ELEMENTS_ON_PAGE :
      Prisma.skip;
    const take = ELEMENTS_ON_PAGE;
    const where: Prisma.FriendWhereInput = {
      OR: [
        {userId},
        {friendId: userId}
      ]
    };
    const include: Prisma.FriendInclude = {
      friend: {
        include: {
          station: true,
          questionnaire: true
        }
      },
      user: {
        include: {
          station: true,
          questionnaire: true
        }
      }
    };

    const [records, friendCount] = await Promise.all([
      this.prismaClient.friend.findMany({where, include, take, skip}),
      this.getFriendCount(where),
    ]);

    return {
      entities: records
        .map((record) => this.createEntityFromDocument(record))
        .filter((entity) => entity !== null),
      currentPage: query?.page || DEFAULT_PAGE_COUNT,
      totalPages: this.calculateNumberPages(friendCount, take),
      itemsPerPage: take,
      totalItems: friendCount,
    };
  }
}
