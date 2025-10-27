import {Injectable} from '@nestjs/common';

import {Prisma, PrismaClientService} from '@1770169-fitfriends/models';
import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {TrainingsQuery} from '@1770169-fitfriends/query';
import {Pagination, RangeFilters, RecommendedFindOptions, SortDirection, Training} from '@1770169-fitfriends/types';

import {TrainingEntity} from './training.entity';
import {DEFAULT_PAGE, ELEMENTS_ON_PAGE} from './training.constant';

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
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.training.create({
      data: prismaObject
    });
    entity.id = record.id

    return entity;
  }

  public override async update(id: TrainingEntity['id'], entity: TrainingEntity): Promise<TrainingEntity | null> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.training.update({
      where: {
        id
      },
      data: prismaObject
    });

    return this.createEntityFromDocument(record);
  }

  public async findRecommended(option: RecommendedFindOptions): Promise<(TrainingEntity | null)[]> {
    const records = await this.prismaClient.training.findMany({
      where: {
        calories: option?.calories !== undefined ? option.calories : Prisma.skip,
        level: option?.level !== undefined ? option.level : Prisma.skip,
        trainingTime: option?.trainingTime !== undefined ? option.trainingTime : Prisma.skip,
        type: {
          in: option?.type !== undefined ? option.type : Prisma.skip
        }
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async find(query?: TrainingsQuery): Promise<Pagination<TrainingEntity>> {
    const skip = query?.page && ELEMENTS_ON_PAGE ?
      (query.page - 1) * ELEMENTS_ON_PAGE :
      Prisma.skip;
    const take = ELEMENTS_ON_PAGE;
    const where: Prisma.TrainingWhereInput = {
      calories: {
        gte: query?.caloriesMin !== undefined ? query.caloriesMin : Prisma.skip,
        lte: query?.caloriesMax !== undefined ? query.caloriesMax : Prisma.skip
      },
      price: {
        gte: query?.priceMin !== undefined ? query.priceMin : Prisma.skip,
        lte: query?.priceMax !== undefined ? query.priceMax : Prisma.skip
      },
      rating: {
        gte: query?.ratingMin !== undefined ? query.ratingMin : Prisma.skip,
        lte: query?.ratingMax !== undefined ? query.ratingMax : Prisma.skip
      },
      type: query?.type?.length ? {
        in: query.type
      } : Prisma.skip,
      coachId: query?.coach ? query.coach : Prisma.skip,
      trainingTime: query?.trainingTime?.length ? {
        in: query.trainingTime
      } : Prisma.skip,
    };
    const orderBy: Prisma.TrainingOrderByWithRelationInput[] = [
      {price: query?.orderByPrice !== undefined ? query.orderByPrice : Prisma.skip},
      {createdAt: query?.orderByDate !== undefined ? query.orderByDate : SortDirection.Down}
    ];

    const [records, trainingCount] = await Promise.all([
      this.prismaClient.training.findMany({where, orderBy, take, skip}),
      this.getTrainingCount(where),
    ]);

    return {
      entities: records
        .map((record) => this.createEntityFromDocument(record))
        .filter((entity) => entity !== null),
      currentPage: query?.page || DEFAULT_PAGE,
      totalPages: this.calculateNumberPages(trainingCount, take),
      itemsPerPage: take,
      totalItems: trainingCount,
    };
  }

  public override async findById(id: TrainingEntity['id']): Promise<TrainingEntity | null> {
    const record = await this.prismaClient.training.findFirst({
      where: {
        id
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async getRange(): Promise<RangeFilters> {
    const record = await this.prismaClient.training.aggregate({
      _min: {
        price: true,
        calories: true
      },
      _max: {
        price: true,
        calories: true
      }
    })

    return {
      price: {
        min: record._min.price ?? 0,
        max: record._max.price ?? 0
      },
      calories: {
        min: record._min.calories ?? 0,
        max: record._max.calories ?? 0
      }
    }
  }

  public override async delete(id: TrainingEntity['id']): Promise<void> {
    await this.prismaClient.training.delete({
      where: {
        id
      }
    });
  }
}
