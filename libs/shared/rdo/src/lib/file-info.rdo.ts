import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {FileInfo} from '@1770169-guitar/types';

import {HASH_NAME_PROPERTY} from './rdo.constant';

export class FailInfoRDO implements FileInfo {
  @ApiProperty({
    description: HASH_NAME_PROPERTY.DESCRIPTION,
    example: HASH_NAME_PROPERTY.EXAMPLE
  })
  @Expose()
  public hashName!: string;

  @ApiProperty({
    description: HASH_NAME_PROPERTY.DESCRIPTION,
    example: HASH_NAME_PROPERTY.EXAMPLE
  })
  @Expose()
  public path!: string;
}
