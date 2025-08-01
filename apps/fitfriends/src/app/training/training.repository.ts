import {Injectable, NotFoundException} from '@nestjs/common';

import {Prisma, PrismaClientService} from '@1770169-fitfriends/models';
import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {createMessage} from '@1770169-fitfriends/helpers';
import {TrainingsQuery} from '@1770169-fitfriends/query';
import {Pagination, Training} from '@1770169-fitfriends/types';

import {TrainingEntity} from './training.entity';
import {DEFAULT_PAGE_COUNT, ELEMENTS_ON_PAGE, NOT_FOUND_BY_ID_MESSAGE} from './training.constant';

@Injectable()
export class TrainingRepository extends BasePostgresRepository<TrainingEntity, Training> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, TrainingEntity.fromObject)
  }

  private async getTrainingCount(where: Prisma.TrainingWhereInput): Promise<number> {
    return this.prismaClient.training.count({where});
  }

  private calculateNumberPages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(entity: TrainingEntity): Promise<TrainingEntity> {
    const objectEntity = entity.toObject();
    const record = await this.prismaClient.training.create({
      data: objectEntity
    });
    entity.id = record.id

    return entity;
  }

  public override async update(id: TrainingEntity['id'], entity: TrainingEntity): Promise<TrainingEntity | null> {
    const objectEntity = entity.toObject();
    const record = await this.prismaClient.training.update({
      where: {
        id
      },
      data: objectEntity
    });

    return this.createEntityFromDocument(record);
  }

  public async find(query?: TrainingsQuery): Promise<Pagination<TrainingEntity>> {
    const skip = query?.page && ELEMENTS_ON_PAGE ?
      (query.page - 1) * ELEMENTS_ON_PAGE :
      Prisma.skip;
    const take = ELEMENTS_ON_PAGE;
    const where: Prisma.TrainingWhereInput = {
      calories: {
        gte: query?.caloriesMin ?? Prisma.skip,
        lte: query?.caloriesMax ?? Prisma.skip
      },
      price: {
        gte: query?.priceMin ?? Prisma.skip,
        lte: query?.priceMax ?? Prisma.skip
      },
      rating: query?.rating ?? Prisma.skip
    };
    const orderBy: Prisma.TrainingOrderByWithRelationInput[] = [
      {price: query?.orderByPrice ?? Prisma.skip},
      {createdAt: query?.orderByDate ?? Prisma.skip}
    ];

    const [records, trainingCount] = await Promise.all([
      this.prismaClient.training.findMany({where, orderBy, take, skip}),
      this.getTrainingCount(where),
    ]);

    return {
      entities: records
        .map((record) => this.createEntityFromDocument(record))
        .filter((entity) => entity !== null),
      currentPage: query?.page || DEFAULT_PAGE_COUNT,
      totalPages: this.calculateNumberPages(trainingCount, take),
      itemsPerPage: take,
      totalItems: trainingCount,
    }
  }

  public override async findById(id: TrainingEntity['id']): Promise<TrainingEntity | null> {
    const record = await this.prismaClient.training.findFirst({
      where: {
        id
      }
    });

    return this.createEntityFromDocument(record);
  }

  public override async delete(id: TrainingEntity['id']): Promise<void> {
    try {
      await this.prismaClient.training.delete({
        where: {
          id
        }
      });
    } catch (error) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
  }
}
