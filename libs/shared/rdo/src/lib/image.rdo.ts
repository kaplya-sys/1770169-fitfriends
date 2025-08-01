import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

import {Image} from '@1770169-fitfriends/types';
import {
  IMAGE_2X_PROPERTY,
  IMAGE_PROPERTY,
  IMAGE_WEBP_2X_PROPERTY,
  IMAGE_WEBP_PROPERTY
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
    description: IMAGE_WEBP_PROPERTY.DESCRIPTION,
    example: IMAGE_WEBP_PROPERTY.EXAMPLE
  })
  @Expose()
  public imageWebp!: string;

  @ApiProperty({
    description: IMAGE_WEBP_2X_PROPERTY.DESCRIPTION,
    example: IMAGE_WEBP_2X_PROPERTY.EXAMPLE
  })
  @Expose()
  public imageWebp2x!: string;
}
