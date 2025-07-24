import {Injectable, NotFoundException} from '@nestjs/common';

import {Prisma, PrismaClientService} from '@1770169-guitar/models';
import {BasePostgresRepository} from '@1770169-guitar/core';
import {createMessage} from '@1770169-guitar/helpers';
import {ProductsQuery} from '@1770169-guitar/query';
import {Pagination, Guitar} from '@1770169-guitar/types';

import {ProductsEntity} from './products.entity';
import {ELEMENTS_ON_PAGE, NOT_FOUND_BY_ID_MESSAGE} from './products.constant';

@Injectable()
export class ProductsRepository extends BasePostgresRepository<ProductsEntity, Guitar> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, ProductsEntity.fromObject)
  }

  private async getProductsCount(where: Prisma.GuitarsWhereInput): Promise<number> {
    return this.prismaClient.guitars.count({where});
  }

  private calculateNumberPages(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(entity: ProductsEntity): Promise<ProductsEntity> {
    const record = await this.prismaClient.guitars.create({
      data: {
        title: entity.title,
        type: entity.type,
        stringCount: entity.stringCount,
        article: entity.article,
        description: entity.description,
        price: entity.price,
        date: entity.date,
        image: entity.image as string
      }
    });

    return this.createEntityFromDocument(record);
  }

  public override async update(id: ProductsEntity['id'], entity: ProductsEntity): Promise<ProductsEntity> {
    const record = await this.prismaClient.guitars.update({
      where: {
        id
      },
      data: {
        ...entity.toObject(),
        image: entity.toObject()?.image as string
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async find(query?: ProductsQuery): Promise<Pagination<ProductsEntity>> {
    const skip = query?.page && ELEMENTS_ON_PAGE ?
      (query.page - 1) * ELEMENTS_ON_PAGE :
      Prisma.skip;
    const take = ELEMENTS_ON_PAGE;
    const where: Prisma.GuitarsWhereInput = {
      type: query?.types?.length ? {
        in: query?.types
      } : Prisma.skip,
      stringCount: query?.strings?.length ? {
        in: query?.strings
      } : Prisma.skip,
    };
    const orderBy: Prisma.GuitarsOrderByWithRelationInput[] = [
      {price: query?.price ? query?.price : Prisma.skip},
      {date: query?.date ? query?.date : Prisma.skip}
    ];

    const [records, trainingCount] = await Promise.all([
      this.prismaClient.guitars.findMany({where, orderBy, take, skip}),
      this.getProductsCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateNumberPages(trainingCount, take),
      itemsPerPage: take,
      totalItems: trainingCount,
    }
  }

  public override async findById(id: ProductsEntity['id']): Promise<ProductsEntity | null> {
    const record = await this.prismaClient.guitars.findFirst({
      where: {
        id
      }
    });

    if(!record) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(record);
  }

  public override async delete(id: ProductsEntity['id']): Promise<void> {
    try {
      await this.prismaClient.guitars.delete({
        where: {
          id
        }
      });
    } catch (error) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
  }
}
