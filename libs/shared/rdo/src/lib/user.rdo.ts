import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {EMAIL_PROPERTY, ID_PROPERTY, NAME_PROPERTY, ROLE_PROPERTY} from './rdo.constant';
import {Role, User} from '@1770169-guitar/types';

export class UserRDO implements User {
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
    description: ROLE_PROPERTY.DESCRIPTION,
    example: ROLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public role!: Role;
}
