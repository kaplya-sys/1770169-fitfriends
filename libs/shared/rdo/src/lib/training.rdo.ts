import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import {
  FitnessLevel,
  TrainingTime,
  Gender,
  Exercise
} from '@1770169-fitfriends/models';

import {
  BACKGROUND_PROPERTY,
  CALORIES_PROPERTY,
  COACH_NAME_PROPERTY,
  FITNESS_LEVEL_PROPERTY,
  GENDER_PROPERTY,
  ID_PROPERTY,
  SPECIAL_OFFER_PROPERTY,
  TRAINING_DATE_PROPERTY,
  TRAINING_DESCRIPTION_PROPERTY,
  TRAINING_PRICE_PROPERTY,
  TRAINING_RATING_PROPERTY,
  TRAINING_TIME_PROPERTY,
  TRAINING_TITLE_PROPERTY,
  TRAINING_TYPE_PROPERTY,
  TRAINING_VIDEO_PROPERTY,
} from './rdo.constant';
import {ImageRDO} from './image.rdo';

export class TrainingRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: TRAINING_TITLE_PROPERTY.DESCRIPTION,
    example: TRAINING_TITLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public title!: string;

  @ApiProperty({
    description: TRAINING_TYPE_PROPERTY.DESCRIPTION,
    example: TRAINING_TYPE_PROPERTY.EXAMPLE
  })
  @Expose()
  public type!: Exercise;

  @ApiProperty({
    description: TRAINING_DESCRIPTION_PROPERTY.DESCRIPTION,
    example: TRAINING_DESCRIPTION_PROPERTY.EXAMPLE
  })
  @Expose()
  public description!: string;

  @ApiProperty({
    description: TRAINING_PRICE_PROPERTY.DESCRIPTION,
    example: TRAINING_PRICE_PROPERTY.EXAMPLE
  })
  @Expose()
  public price!: number;

  @ApiProperty({
    description: BACKGROUND_PROPERTY.DESCRIPTION
  })
  @Type(() => ImageRDO)
  @Expose()
  public background!: ImageRDO;

  @ApiProperty({
    description: FITNESS_LEVEL_PROPERTY.DESCRIPTION,
    example: FITNESS_LEVEL_PROPERTY.EXAMPLE
  })
  @Expose()
  public level!: FitnessLevel;

  @ApiProperty({
    description: TRAINING_TIME_PROPERTY.DESCRIPTION,
    example: TRAINING_TIME_PROPERTY.EXAMPLE
  })
  @Expose()
  public trainingTime!: TrainingTime;

  @ApiProperty({
    description: CALORIES_PROPERTY.DESCRIPTION,
    example: CALORIES_PROPERTY.EXAMPLE
  })
  @Expose()
  public calories!: number;

  @ApiProperty({
    description: GENDER_PROPERTY.DESCRIPTION,
    example: GENDER_PROPERTY.EXAMPLE
  })
  @Expose()
  public gender!: Gender;

  @ApiProperty({
    description: TRAINING_RATING_PROPERTY.DESCRIPTION,
    example: TRAINING_RATING_PROPERTY.EXAMPLE
  })
  @Expose()
  public rating!: number;

  @ApiProperty({
    description: TRAINING_VIDEO_PROPERTY.DESCRIPTION,
    example: TRAINING_VIDEO_PROPERTY.EXAMPLE
  })
  @Expose()
  public video!: string;

  @ApiProperty({
    description: COACH_NAME_PROPERTY.DESCRIPTION,
    example: COACH_NAME_PROPERTY.EXAMPLE
  })
  @Expose()
  public coachName!: string;

  @ApiProperty({
    description: SPECIAL_OFFER_PROPERTY.DESCRIPTION,
    example: SPECIAL_OFFER_PROPERTY.EXAMPLE
  })
  @Expose()
  public specialOffer!: boolean;

  @ApiProperty({
    description: TRAINING_DATE_PROPERTY.DESCRIPTION,
    example: TRAINING_DATE_PROPERTY.EXAMPLE
  })
  @Expose()
  public createdAt!: Date;
}
