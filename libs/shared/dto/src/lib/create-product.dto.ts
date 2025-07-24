import {ApiProperty} from '@nestjs/swagger';
import {
  IsISO8601,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min
} from 'class-validator';
import {Transform} from 'class-transformer';

import {GuitarType, GuitarStrings, CreateGuitar} from '@1770169-guitar/types';

import {
  PRODUCT_ARTICLE_PROPERTY,
  PRODUCT_CREATE_DATE_PROPERTY,
  PRODUCT_DESCRIPTION_PROPERTY,
  PRODUCT_PRICE_PROPERTY,
  PRODUCT_STRINGS_PROPERTY,
  PRODUCT_TITLE_PROPERTY,
  PRODUCT_TYPE_PROPERTY
} from './dto.const';

export class CreateProductDTO implements CreateGuitar {
  @ApiProperty({
    description: PRODUCT_TITLE_PROPERTY.DESCRIPTION,
    example: PRODUCT_TITLE_PROPERTY.EXAMPLE,
    minimum: PRODUCT_TITLE_PROPERTY.MIN,
    maximum: PRODUCT_TITLE_PROPERTY.MAX,
    type: PRODUCT_TITLE_PROPERTY.TYPE
  })
  @IsString()
  @Length(PRODUCT_TITLE_PROPERTY.MIN, PRODUCT_TITLE_PROPERTY.MAX)
  @IsNotEmpty()
  public title!: string;

  @ApiProperty({
    description: PRODUCT_DESCRIPTION_PROPERTY.DESCRIPTION,
    example: PRODUCT_DESCRIPTION_PROPERTY.EXAMPLE,
    minimum: PRODUCT_DESCRIPTION_PROPERTY.MIN,
    maximum: PRODUCT_DESCRIPTION_PROPERTY.MAX,
    type: PRODUCT_DESCRIPTION_PROPERTY.TYPE
  })
  @IsString()
  @Length(PRODUCT_DESCRIPTION_PROPERTY.MIN, PRODUCT_DESCRIPTION_PROPERTY.MAX)
  @IsNotEmpty()
  public description!: string;

  @ApiProperty({
    description: PRODUCT_TYPE_PROPERTY.DESCRIPTION,
    example: PRODUCT_TYPE_PROPERTY.EXAMPLE,
    enum: PRODUCT_TYPE_PROPERTY.ENUM
  })
  @IsEnum(GuitarType)
  @IsNotEmpty()
  public type!: GuitarType;

  @ApiProperty({
    description: PRODUCT_STRINGS_PROPERTY.DESCRIPTION,
    example: PRODUCT_STRINGS_PROPERTY.EXAMPLE,
    enum: PRODUCT_STRINGS_PROPERTY.ENUM
  })
  @IsEnum(GuitarStrings)
  @IsNotEmpty()
  public stringCount!: GuitarStrings;

  @ApiProperty({
    description: PRODUCT_ARTICLE_PROPERTY.DESCRIPTION,
    example: PRODUCT_ARTICLE_PROPERTY.EXAMPLE,
    minimum: PRODUCT_ARTICLE_PROPERTY.MIN,
    maximum: PRODUCT_ARTICLE_PROPERTY.MAX,
    type: PRODUCT_ARTICLE_PROPERTY.TYPE
  })
  @IsString()
  @Length(PRODUCT_ARTICLE_PROPERTY.MIN, PRODUCT_ARTICLE_PROPERTY.MAX)
  @IsNotEmpty()
  public article!: string;

  @ApiProperty({
    description: PRODUCT_PRICE_PROPERTY.DESCRIPTION,
    example: PRODUCT_PRICE_PROPERTY.EXAMPLE,
    minimum: PRODUCT_PRICE_PROPERTY.MIN,
    maximum: PRODUCT_PRICE_PROPERTY.MAX,
    type: PRODUCT_PRICE_PROPERTY.TYPE
  })
  @IsInt()
  @Min(PRODUCT_PRICE_PROPERTY.MIN)
  @Max(PRODUCT_PRICE_PROPERTY.MAX)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  public price!: number;

  @ApiProperty({
    description: PRODUCT_CREATE_DATE_PROPERTY.DESCRIPTION,
    example: PRODUCT_CREATE_DATE_PROPERTY.EXAMPLE,
    type: PRODUCT_CREATE_DATE_PROPERTY.TYPE,
    format: PRODUCT_CREATE_DATE_PROPERTY.FORMAT
  })
  @IsISO8601({strict: true})
  @IsNotEmpty()
  public date!: string;
}
