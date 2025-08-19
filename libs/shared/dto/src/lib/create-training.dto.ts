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
  CALORIES_PROPERTY,
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
    type: String
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
    type: String
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
    type: Number
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
  public level!: FitnessLevel;

  @ApiProperty({
    description: TRAINING_TIME_PROPERTY.DESCRIPTION,
    example: TRAINING_TIME_PROPERTY.EXAMPLE,
    enum: TRAINING_TIME_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  public trainingTime!: TrainingTime;

  @ApiProperty({
    description: CALORIES_PROPERTY.DESCRIPTION,
    example: CALORIES_PROPERTY.EXAMPLE,
    minimum: CALORIES_PROPERTY.MIN,
    maximum: CALORIES_PROPERTY.MAX,
    type: Number
  })
  @IsInt()
  @Min(CALORIES_PROPERTY.MIN)
  @Max(CALORIES_PROPERTY.MAX)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  public calories!: number;

  @ApiProperty({
    description: GENDER_PROPERTY.DESCRIPTION,
    example: GENDER_PROPERTY.EXAMPLE,
    enum: GENDER_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  public gender!: Gender;
}
