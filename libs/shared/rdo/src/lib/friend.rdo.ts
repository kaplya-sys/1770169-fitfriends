import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import {
  FRIEND_PROPERTY,
  ID_PROPERTY,
  IS_JOIN_TRAINING_PROPERTY,
  IS_PERSONAL_TRAINING_PROPERTY,
  USER_PROPERTY
} from './rdo.constant';
import {UserRDO} from './user.rdo';

export class FriendRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: FRIEND_PROPERTY.DESCRIPTION,
    type: UserRDO
  })
  @Type(() => UserRDO)
  @Expose()
  public user!: UserRDO;

  @ApiProperty({
    description: USER_PROPERTY.DESCRIPTION,
    type: UserRDO
  })
  @Type(() => UserRDO)
  @Expose()
  public friend!: UserRDO;

  @ApiProperty({
    description: IS_JOIN_TRAINING_PROPERTY.DESCRIPTION,
    example: IS_JOIN_TRAINING_PROPERTY.EXAMPLE
  })
  @Expose()
  public isJoinTraining?: boolean;

  @ApiProperty({
    description: IS_PERSONAL_TRAINING_PROPERTY.DESCRIPTION,
    example: IS_PERSONAL_TRAINING_PROPERTY.EXAMPLE
  })
  @Expose()
  public isPersonalTraining?: boolean;
}
