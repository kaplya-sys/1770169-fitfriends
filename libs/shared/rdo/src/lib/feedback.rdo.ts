import {ApiProperty} from "@nestjs/swagger";
import {Expose, Type} from "class-transformer";

import {
  ASSESSMENT_PROPERTY,
  AUTHOR_DATE_PROPERTY,
  CONTENT_PROPERTY,
  FEEDBACK_DATE_PROPERTY,
  ID_PROPERTY
} from "./rdo.constant";
import {CustomUserRDO} from "./custom-user.rdo";

export class FeedbackRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: ASSESSMENT_PROPERTY.DESCRIPTION,
    example: ASSESSMENT_PROPERTY.EXAMPLE
  })
  @Expose()
  public assessment!: number;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @Expose()
  public content!: string;

  @ApiProperty({
    description: FEEDBACK_DATE_PROPERTY.DESCRIPTION,
    example: FEEDBACK_DATE_PROPERTY.EXAMPLE
  })
  @Expose()
  public createdAt!: Date;

  @ApiProperty({
    description: AUTHOR_DATE_PROPERTY.DESCRIPTION,
    type: CustomUserRDO
  })
  @Type(() => CustomUserRDO)
  @Expose()
  public author!: CustomUserRDO;
}
