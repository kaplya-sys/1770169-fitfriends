import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import {GuitarType, GuitarStrings, Guitar} from '@1770169-guitar/types';
import {
  ID_PROPERTY,
  PRODUCT_ARTICLE_PROPERTY,
  PRODUCT_DATE_PROPERTY,
  PRODUCT_DESCRIPTION_PROPERTY,
  PRODUCT_PRICE_PROPERTY,
  PRODUCT_STRINGS_PROPERTY,
  PRODUCT_TITLE_PROPERTY,
  PRODUCT_TYPE_PROPERTY
} from './rdo.constant';
import {ImageRDO} from './image.rdo';

export class ProductRDO  implements Guitar {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: PRODUCT_TITLE_PROPERTY.DESCRIPTION,
    example: PRODUCT_TITLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public title!: string;

  @ApiProperty({
    description: PRODUCT_DESCRIPTION_PROPERTY.DESCRIPTION,
    example: PRODUCT_DESCRIPTION_PROPERTY.EXAMPLE
  })
  @Expose()
  public description!: string;

  @Expose()
  @Type(() => ImageRDO)
  public image!: ImageRDO;

  @ApiProperty({
    description: PRODUCT_TYPE_PROPERTY.DESCRIPTION,
    example: PRODUCT_TYPE_PROPERTY.EXAMPLE
  })
  @Expose()
  public type!: GuitarType;

  @ApiProperty({
    description: PRODUCT_STRINGS_PROPERTY.DESCRIPTION,
    example: PRODUCT_STRINGS_PROPERTY.EXAMPLE
  })
  @Expose()
  public stringCount!: GuitarStrings;

  @ApiProperty({
    description: PRODUCT_ARTICLE_PROPERTY.DESCRIPTION,
    example: PRODUCT_ARTICLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public article!: string;

  @ApiProperty({
    description: PRODUCT_PRICE_PROPERTY.DESCRIPTION,
    example: PRODUCT_PRICE_PROPERTY.EXAMPLE
  })
  @Expose()
  public price!: number;

  @ApiProperty({
    description: PRODUCT_DATE_PROPERTY.DESCRIPTION,
    example: PRODUCT_DATE_PROPERTY.EXAMPLE
  })
  @Expose()
  public date!: Date;
}
