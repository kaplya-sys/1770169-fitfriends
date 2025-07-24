import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {
  ACCESS_TOKEN_PROPERTY,
  EMAIL_PROPERTY,
  ID_PROPERTY,
  REFRESH_TOKEN_PROPERTY,
  ROLE_PROPERTY
} from './rdo.constant';
import {Role} from '@1770169-guitar/types';

export class AuthenticatedUserRDO {
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
    description: ACCESS_TOKEN_PROPERTY.DESCRIPTION,
    example: ACCESS_TOKEN_PROPERTY.EXAMPLE
  })
  @Expose()
  public accessToken!: string;

  @ApiProperty({
    description: REFRESH_TOKEN_PROPERTY.DESCRIPTION,
    example: REFRESH_TOKEN_PROPERTY.EXAMPLE
  })
  @Expose()
  public refreshToken!: string;
  @ApiProperty({
    description: ROLE_PROPERTY.DESCRIPTION,
    example: ROLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public role!: Role;
}
