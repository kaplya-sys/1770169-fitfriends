import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {Station} from '@1770169-fitfriends/models';

import {LATITUDE_PROPERTY, LONGITUDE_PROPERTY, STATION_PROPERTY} from './rdo.constant';

export class StationRDO {
  @ApiProperty({
    description: LATITUDE_PROPERTY.DESCRIPTION,
    example: LATITUDE_PROPERTY.EXAMPLE
  })
  @Expose()
  public latitude!: number;

  @ApiProperty({
    description: LONGITUDE_PROPERTY.DESCRIPTION,
    example: LONGITUDE_PROPERTY.EXAMPLE
  })
  @Expose()
  public longitude!: number;

  @ApiProperty({
    description: STATION_PROPERTY.DESCRIPTION,
    example: STATION_PROPERTY.EXAMPLE
  })
  @Expose()
  public station!: Station;
}
