import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

import {MAX_PROPERTY, MIN_PROPERTY} from "./rdo.constant";

export class RangeRDO {
  @ApiProperty({
    description: MIN_PROPERTY.DESCRIPTION,
    example: MIN_PROPERTY.EXAMPLE
  })
  @Expose()
  public min!: number;

  @ApiProperty({
    description: MAX_PROPERTY.DESCRIPTION,
    example: MAX_PROPERTY.EXAMPLE
  })
  @Expose()
  public max!: number;
}
