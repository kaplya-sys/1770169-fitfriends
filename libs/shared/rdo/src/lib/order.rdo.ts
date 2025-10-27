import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import {Exercise, PaymentMethod} from '@1770169-fitfriends/models';

import {TrainingRDO} from './training.rdo';
import {
  COUNT_PROPERTY,
  EXERCISE_PROPERTY,
  ID_PROPERTY,
  ORDER_AMOUNT_PROPERTY,
  PAYMENT_PROPERTY,
  TRAINING_PRICE_PROPERTY,
  TRAINING_PROPERTY
} from './rdo.constant';

export class OrderRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: EXERCISE_PROPERTY.DESCRIPTION,
    example: EXERCISE_PROPERTY.EXAMPLE
  })
  @Expose()
  public exercise!: Exercise;

  @ApiProperty({
    description: TRAINING_PRICE_PROPERTY.DESCRIPTION,
    example: TRAINING_PRICE_PROPERTY.EXAMPLE
  })
  @Expose()
  public price!: number;

  @ApiProperty({
    description: COUNT_PROPERTY.DESCRIPTION,
    example: COUNT_PROPERTY.EXAMPLE
  })
  @Expose()
  public count!: number;

  @ApiProperty({
    description: ORDER_AMOUNT_PROPERTY.DESCRIPTION,
    example: ORDER_AMOUNT_PROPERTY.EXAMPLE
  })
  @Expose()
  public amount!: number;

  @ApiProperty({
    description: PAYMENT_PROPERTY.DESCRIPTION,
    example: PAYMENT_PROPERTY.EXAMPLE
  })
  @Expose()
  public payment!: PaymentMethod;

  @ApiProperty({
    description: TRAINING_PROPERTY.DESCRIPTION,
    type: TrainingRDO
  })
  @Type(() => TrainingRDO)
  @Expose()
  public training!: TrainingRDO;
}
