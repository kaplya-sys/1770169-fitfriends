import {ApiProperty} from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min
} from 'class-validator';
import {Transform} from 'class-transformer';

import {Exercise, PaymentMethod} from '@1770169-fitfriends/models';
import {CreateOrder} from '@1770169-fitfriends/types';

import {
  AMOUNT_PROPERTY,
  COUNT_PROPERTY,
  EXERCISE_PROPERTY,
  PAYMENT_PROPERTY,
  PRICE_PROPERTY
} from './dto.const';

export class CreateOrderDTO implements CreateOrder {
  @ApiProperty({
    description: EXERCISE_PROPERTY.DESCRIPTION,
    example: EXERCISE_PROPERTY.EXAMPLE,
    enum: EXERCISE_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  public exercise!: Exercise;

  @ApiProperty({
    description: PRICE_PROPERTY.DESCRIPTION,
    example: PRICE_PROPERTY.EXAMPLE,
    type: Number
  })
  @IsInt()
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  public price!: number;

  @ApiProperty({
    description: COUNT_PROPERTY.DESCRIPTION,
    example: COUNT_PROPERTY.EXAMPLE,
    minimum: COUNT_PROPERTY.MIN,
    maximum: COUNT_PROPERTY.MAX,
    type: Number
  })
  @IsInt()
  @Min(COUNT_PROPERTY.MIN)
  @Max(COUNT_PROPERTY.MAX)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  public count!: number;

  @ApiProperty({
    description: AMOUNT_PROPERTY.DESCRIPTION,
    example: AMOUNT_PROPERTY.EXAMPLE,
    type: Number
  })
  @IsInt()
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  public amount!: number;

  @ApiProperty({
    description: PAYMENT_PROPERTY.DESCRIPTION,
    example: PAYMENT_PROPERTY.EXAMPLE,
    enum: PAYMENT_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  public payment!: PaymentMethod;
}
