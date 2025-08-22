import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {ACCESS_TOKEN_PROPERTY, REFRESH_TOKEN_PROPERTY} from './rdo.constant';

export class TokenRDO {
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
}
