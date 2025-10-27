import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import {
  AVATAR_PROPERTY,
  EMAIL_PROPERTY,
  ID_PROPERTY,
  NAME_PROPERTY
} from './rdo.constant';
import {ImageRDO} from './image.rdo';

export class CustomUserRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: NAME_PROPERTY.DESCRIPTION,
    example: NAME_PROPERTY.EXAMPLE
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: AVATAR_PROPERTY.DESCRIPTION,
    type: ImageRDO
  })
  @Type(() => ImageRDO)
  @Expose()
  public avatar?: ImageRDO;
}
