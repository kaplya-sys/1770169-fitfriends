import {ApiProperty} from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min
} from 'class-validator';

import {
  CreateUserQuestionnaire,
  Exercise,
  FitnessLevel,
  TrainingTime
} from '@1770169-fitfriends/types';

import {
  CALORIE_LOSE_PROPERTY,
  CALORIE_WASTE_PROPERTY,
  EXERCISE_PROPERTY,
  FITNESS_LEVEL_PROPERTY,
  TRAINING_TIME_PROPERTY
} from './dto.const';
import { Transform } from 'class-transformer';

export class CreateUserQuestionnaireDTO implements CreateUserQuestionnaire {
  @ApiProperty({
    description: FITNESS_LEVEL_PROPERTY.DESCRIPTION,
    example: FITNESS_LEVEL_PROPERTY.EXAMPLE,
    enum: FITNESS_LEVEL_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  fitnessLevel!: FitnessLevel;

  @ApiProperty({
    description: TRAINING_TIME_PROPERTY.DESCRIPTION,
    example: TRAINING_TIME_PROPERTY.EXAMPLE,
    enum: TRAINING_TIME_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  trainingTime!: TrainingTime;

  @ApiProperty({
    description: EXERCISE_PROPERTY.DESCRIPTION,
    example: EXERCISE_PROPERTY.EXAMPLE,
    enum: EXERCISE_PROPERTY.ENUM,
    type: [EXERCISE_PROPERTY.TYPE],
    maxItems: EXERCISE_PROPERTY.MAX_ITEMS
  })
  @IsArray()
  @ArrayMaxSize(EXERCISE_PROPERTY.MAX_ITEMS)
  @IsNotEmpty()
  exercise!: Exercise[];

  @ApiProperty({
    description: CALORIE_LOSE_PROPERTY.DESCRIPTION,
    example: CALORIE_LOSE_PROPERTY.EXAMPLE,
    minimum: CALORIE_LOSE_PROPERTY.MIN,
    maximum: CALORIE_LOSE_PROPERTY.MAX,
    type: CALORIE_LOSE_PROPERTY.TYPE
  })
  @IsInt()
  @Min(CALORIE_LOSE_PROPERTY.MIN)
  @Max(CALORIE_LOSE_PROPERTY.MAX)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  calorieLose!: number;

  @ApiProperty({
    description: CALORIE_WASTE_PROPERTY.DESCRIPTION,
    example: CALORIE_WASTE_PROPERTY.EXAMPLE,
    minimum: CALORIE_WASTE_PROPERTY.MIN,
    maximum: CALORIE_WASTE_PROPERTY.MAX,
    type: CALORIE_WASTE_PROPERTY.TYPE
  })
  @IsInt()
  @Min(CALORIE_WASTE_PROPERTY.MIN)
  @Max(CALORIE_WASTE_PROPERTY.MAX)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  calorieWaste!: number;
}
