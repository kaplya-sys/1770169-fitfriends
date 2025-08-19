import {Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

import {TrainingRDO} from "./training.rdo";
import {AMOUNT_PROPERTY, ID_PROPERTY, TRAINING_PROPERTY} from "./rdo.constant";

export class BalanceRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: AMOUNT_PROPERTY.DESCRIPTION,
    example: AMOUNT_PROPERTY.EXAMPLE
  })
  @Expose()
  public amount!: number;

  @ApiProperty({
    description: TRAINING_PROPERTY.DESCRIPTION,
    type: TrainingRDO
  })
  @Type(() => TrainingRDO)
  @Expose()
  public training!: TrainingRDO;
}
