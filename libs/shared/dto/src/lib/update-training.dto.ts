import {ApiProperty} from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min
} from 'class-validator';
import {Transform} from 'class-transformer';

import {UpdateTraining} from '@1770169-fitfriends/types';

import {DESCRIPTION_PROPERTY, PRICE_PROPERTY, SPECIAL_OFFER_PROPERTY, TITLE_PROPERTY} from './dto.const';

export class UpdateTrainingDTO implements UpdateTraining {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE,
    minimum: TITLE_PROPERTY.MIN,
    maximum: TITLE_PROPERTY.MAX,
    type: String
  })
  @IsString()
  @Length(TITLE_PROPERTY.MIN, TITLE_PROPERTY.MAX)
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE,
    minimum: DESCRIPTION_PROPERTY.MIN,
    maximum: DESCRIPTION_PROPERTY.MAX,
    type: String
  })
  @IsString()
  @Length(DESCRIPTION_PROPERTY.MIN, DESCRIPTION_PROPERTY.MAX)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: PRICE_PROPERTY.DESCRIPTION,
    example: PRICE_PROPERTY.EXAMPLE,
    minimum: PRICE_PROPERTY.MIN,
    type: Number
  })
  @IsInt()
  @Min(PRICE_PROPERTY.MIN)
  @Transform(({value}) => parseInt(value, 10))
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: SPECIAL_OFFER_PROPERTY.DESCRIPTION,
    example: SPECIAL_OFFER_PROPERTY.EXAMPLE,
    type: Boolean
  })
  @Transform(({value}) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  public specialOffer?: boolean;
}
