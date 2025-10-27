import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {UserApplicationStatus} from '@1770169-fitfriends/models';
import {
  ID_PROPERTY,
  USER_APPLICATION_DATE_PROPERTY,
  USER_APPLICATION_STATUS_PROPERTY,
  USER_APPLICATION_UPDATE_DATE_PROPERTY
} from './rdo.constant';

export class UserApplicationRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public initiatorId!: string;

  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public userId!: string;

  @ApiProperty({
    description: USER_APPLICATION_STATUS_PROPERTY.DESCRIPTION,
    example: USER_APPLICATION_STATUS_PROPERTY.EXAMPLE
  })
  @Expose()
  public status!: UserApplicationStatus;

  @ApiProperty({
    description: USER_APPLICATION_DATE_PROPERTY.DESCRIPTION,
    example: USER_APPLICATION_DATE_PROPERTY.EXAMPLE
  })
  @Expose()
  public createdAt!: Date;

  @ApiProperty({
    description: USER_APPLICATION_UPDATE_DATE_PROPERTY.DESCRIPTION,
    example: USER_APPLICATION_UPDATE_DATE_PROPERTY.EXAMPLE
  })
  @Expose()
  public updatedAt!: Date;
}
