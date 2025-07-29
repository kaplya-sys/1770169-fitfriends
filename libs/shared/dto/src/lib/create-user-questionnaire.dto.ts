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
import {Transform} from 'class-transformer';

import {Exercise, FitnessLevel, TrainingTime} from '@1770169-fitfriends/models';
import {CreateUserQuestionnaire} from '@1770169-fitfriends/types';

import {
  CALORIES_LOSE_PROPERTY,
  CALORIES_WASTE_PROPERTY,
  EXERCISE_PROPERTY,
  FITNESS_LEVEL_PROPERTY,
  TRAINING_TIME_PROPERTY
} from './dto.const';

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
    description: CALORIES_LOSE_PROPERTY.DESCRIPTION,
    example: CALORIES_LOSE_PROPERTY.EXAMPLE,
    minimum: CALORIES_LOSE_PROPERTY.MIN,
    maximum: CALORIES_LOSE_PROPERTY.MAX,
    type: CALORIES_LOSE_PROPERTY.TYPE
  })
  @IsInt()
  @Min(CALORIES_LOSE_PROPERTY.MIN)
  @Max(CALORIES_LOSE_PROPERTY.MAX)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  caloriesLose!: number;

  @ApiProperty({
    description: CALORIES_WASTE_PROPERTY.DESCRIPTION,
    example: CALORIES_WASTE_PROPERTY.EXAMPLE,
    minimum: CALORIES_WASTE_PROPERTY.MIN,
    maximum: CALORIES_WASTE_PROPERTY.MAX,
    type: CALORIES_WASTE_PROPERTY.TYPE
  })
  @IsInt()
  @Min(CALORIES_WASTE_PROPERTY.MIN)
  @Max(CALORIES_WASTE_PROPERTY.MAX)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  caloriesWaste!: number;
}
