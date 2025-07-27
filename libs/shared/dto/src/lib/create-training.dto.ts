import {ApiProperty} from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min
} from 'class-validator';
import {Transform} from 'class-transformer';

import {Exercise, FitnessLevel, Gender, TrainingTime} from '@1770169-fitfriends/models';
import {CreateTraining} from '@1770169-fitfriends/types';

import {
  CALORIE_PROPERTY,
  DESCRIPTION_PROPERTY,
  EXERCISE_PROPERTY,
  FITNESS_LEVEL_PROPERTY,
  GENDER_PROPERTY,
  PRICE_PROPERTY,
  TITLE_PROPERTY,
  TRAINING_TIME_PROPERTY
} from './dto.const';

export class CreateTrainingDTO implements CreateTraining {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE,
    minimum: TITLE_PROPERTY.MIN,
    maximum: TITLE_PROPERTY.MAX,
    type: TITLE_PROPERTY.TYPE
  })
  @IsString()
  @Length(TITLE_PROPERTY.MIN, TITLE_PROPERTY.MAX)
  @IsNotEmpty()
  public title!: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE,
    minimum: DESCRIPTION_PROPERTY.MIN,
    maximum: DESCRIPTION_PROPERTY.MAX,
    type: DESCRIPTION_PROPERTY.TYPE
  })
  @IsString()
  @Length(DESCRIPTION_PROPERTY.MIN, DESCRIPTION_PROPERTY.MAX)
  @IsNotEmpty()
  public description!: string;

  @ApiProperty({
    description: EXERCISE_PROPERTY.DESCRIPTION,
    example: EXERCISE_PROPERTY.EXAMPLE,
    enum: EXERCISE_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  public type!: Exercise;

  @ApiProperty({
    description: PRICE_PROPERTY.DESCRIPTION,
    example: PRICE_PROPERTY.EXAMPLE,
    minimum: PRICE_PROPERTY.MIN,
    type: PRICE_PROPERTY.TYPE
  })
  @IsInt()
  @Min(PRICE_PROPERTY.MIN)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  public price!: number;

  @ApiProperty({
    description: FITNESS_LEVEL_PROPERTY.DESCRIPTION,
    example: FITNESS_LEVEL_PROPERTY.EXAMPLE,
    enum: FITNESS_LEVEL_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  level!: FitnessLevel;

  @ApiProperty({
    description: TRAINING_TIME_PROPERTY.DESCRIPTION,
    example: TRAINING_TIME_PROPERTY.EXAMPLE,
    enum: TRAINING_TIME_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  trainingTime!: TrainingTime;

  @ApiProperty({
    description: CALORIE_PROPERTY.DESCRIPTION,
    example: CALORIE_PROPERTY.EXAMPLE,
    minimum: CALORIE_PROPERTY.MIN,
    maximum: CALORIE_PROPERTY.MAX,
    type: CALORIE_PROPERTY.TYPE
  })
  @IsInt()
  @Min(CALORIE_PROPERTY.MIN)
  @Max(CALORIE_PROPERTY.MAX)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  calorie!: number;

  @ApiProperty({
    description: GENDER_PROPERTY.DESCRIPTION,
    example: GENDER_PROPERTY.EXAMPLE,
    enum: GENDER_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  gender!: Gender;
}
