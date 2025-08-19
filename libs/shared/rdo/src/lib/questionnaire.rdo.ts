import {Expose, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

import {Exercise, FitnessLevel, TrainingTime} from "@1770169-fitfriends/models";

import {
  CALORIES_LOSE_PROPERTY,
  CALORIES_WASTE_PROPERTY,
  EXERCISE_PROPERTY,
  EXPERIENCE_PROPERTY,
  FITNESS_LEVEL_PROPERTY,
  PERSONAL_TRAINING_PROPERTY,
  QUALIFICATIONS_PROPERTY,
  TRAINING_TIME_PROPERTY
} from "./rdo.constant";
import {ImageRDO} from "./image.rdo";

export class QuestionnaireRdo {
  @ApiProperty({
    description: EXERCISE_PROPERTY.DESCRIPTION,
    example: EXERCISE_PROPERTY.EXAMPLE
  })
  @Expose()
  public exercises!: Exercise[];

  @ApiProperty({
    description: FITNESS_LEVEL_PROPERTY.DESCRIPTION,
    example: FITNESS_LEVEL_PROPERTY.EXAMPLE
  })
  @Expose()
  public fitnessLevel!: FitnessLevel;

  @ApiProperty({
    description: CALORIES_LOSE_PROPERTY.DESCRIPTION,
    example: CALORIES_LOSE_PROPERTY.EXAMPLE
  })
  @Expose()
  public caloriesLose!: number;

  @ApiProperty({
    description: CALORIES_WASTE_PROPERTY.DESCRIPTION,
    example: CALORIES_WASTE_PROPERTY.EXAMPLE
  })
  @Expose()
  public caloriesWaste!: number;

  @ApiProperty({
    description: QUALIFICATIONS_PROPERTY.DESCRIPTION,
    type: ImageRDO,
    isArray: true
  })
  @Type(() => ImageRDO)
  @Expose()
  public qualifications!: ImageRDO[];

  @ApiProperty({
    description: TRAINING_TIME_PROPERTY.DESCRIPTION,
    example: TRAINING_TIME_PROPERTY.EXAMPLE
  })
  @Expose()
  public trainingTime?: TrainingTime;

  @ApiProperty({
    description: PERSONAL_TRAINING_PROPERTY.DESCRIPTION,
    example: PERSONAL_TRAINING_PROPERTY.EXAMPLE
  })
  @Expose()
  public isPersonal!: boolean;

  @ApiProperty({
    description: EXPERIENCE_PROPERTY.DESCRIPTION,
    example: EXPERIENCE_PROPERTY.EXAMPLE
  })
  @Expose()
  public experience?: string;
}
