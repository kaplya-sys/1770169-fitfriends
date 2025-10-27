import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';

import {FileInfo} from '@1770169-fitfriends/types';
import {ID_PROPERTY, PATH_PROPERTY} from './rdo.constant';

export class QualificationRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: PATH_PROPERTY.DESCRIPTION,
    example: PATH_PROPERTY.EXAMPLE
  })
  @Transform(({value}: {value: FileInfo}) => value.path)
  @Expose({name: 'document'})
  public path!: string;
}
