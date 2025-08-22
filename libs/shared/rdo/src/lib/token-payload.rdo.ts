import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {Role} from '@1770169-fitfriends/models';

import {EMAIL_PROPERTY, ID_PROPERTY, NAME_PROPERTY, ROLE_PROPERTY} from './rdo.constant';

export class TokenPayloadRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose({name: 'sub'})
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
