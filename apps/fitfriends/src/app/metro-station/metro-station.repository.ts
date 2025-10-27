import {Injectable} from '@nestjs/common';

import {BasePostgresRepository} from '@1770169-fitfriends/core';
import {PrismaClientService} from '@1770169-fitfriends/models';
import {MetroStation} from '@1770169-fitfriends/types';

import {MetroStationEntity} from './metro-station.entity';

@Injectable()
export class MetroStationRepository extends BasePostgresRepository<MetroStationEntity, MetroStation> {
  constructor(
    protected override readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, MetroStationEntity.fromObject)
  }

  public async create(entity: MetroStationEntity): Promise<MetroStationEntity> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.metroStation.create({
      data: prismaObject
    })
    entity.id = record.id

    return entity;
  }

  public override async update(id: MetroStationEntity['id'], entity: MetroStationEntity): Promise<MetroStationEntity> {
    const prismaObject = entity.toPrismaObject();
    const record = await this.prismaClient.metroStation.update({
      where: {
        id
      },
      data: prismaObject
    })
    entity.id = record.id

    return entity;
  }

  public override async findById(id: MetroStationEntity['id']): Promise<MetroStationEntity | null> {
    const record = await this.prismaClient.metroStation.findFirst({
      where: {
        id
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async findByStation(station: MetroStationEntity['station']): Promise<(MetroStationEntity | null)> {
    const record = await this.prismaClient.metroStation.findFirst({
      where: {
        station
      }
    });

    return this.createEntityFromDocument(record);
  }
}
