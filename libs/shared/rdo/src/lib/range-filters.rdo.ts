import {ApiProperty} from "@nestjs/swagger";
import {Expose, Type} from "class-transformer";

import {RangeRDO} from "./range.rdo";
import {RANGE_CALORIES_PROPERTY, RANGE_PRICE_PROPERTY} from "./rdo.constant";

export class RangeFiltersRDO {
  @ApiProperty({
    description: RANGE_PRICE_PROPERTY.DESCRIPTION,
    type: RangeRDO
  })
  @Type(() => RangeRDO)
  @Expose()
  public price!: RangeRDO;

  @ApiProperty({
    description: RANGE_CALORIES_PROPERTY.DESCRIPTION,
    type: RangeRDO
  })
  @Type(() => RangeRDO)
  @Expose()
  public calories!: RangeRDO;
}
