import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {Image} from '@1770169-fitfriends/types';
import {
  IMAGE_2X_PROPERTY,
  IMAGE_PROPERTY,
  IMAGE_WEB_2X_PROPERTY,
  IMAGE_WEB_PROPERTY
} from './rdo.constant';
export class ImageRDO implements Image {
  @ApiProperty({
    description: IMAGE_PROPERTY.DESCRIPTION,
    example: IMAGE_PROPERTY.EXAMPLE
  })
  @Expose()
  public image!: string;

  @ApiProperty({
    description: IMAGE_2X_PROPERTY.DESCRIPTION,
    example: IMAGE_2X_PROPERTY.EXAMPLE
  })
  @Expose()
  public image2x!: string;

  @ApiProperty({
    description: IMAGE_WEB_PROPERTY.DESCRIPTION,
    example: IMAGE_WEB_PROPERTY.EXAMPLE
  })
  @Expose()
  public imageWeb!: string;

  @ApiProperty({
    description: IMAGE_WEB_2X_PROPERTY.DESCRIPTION,
    example: IMAGE_WEB_2X_PROPERTY.EXAMPLE
  })
  @Expose()
  public imageWeb2x!: string;
}
