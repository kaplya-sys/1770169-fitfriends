import {ApiProperty} from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length
} from 'class-validator';

import {Exercise, FitnessLevel} from '@1770169-fitfriends/models';
import {CreateCoachQuestionnaire} from '@1770169-fitfriends/types';

import {
  EXERCISE_PROPERTY,
  EXPERIENCE_PROPERTY,
  FITNESS_LEVEL_PROPERTY,
  PERSONAL_TRAINING_PROPERTY
} from './dto.const';
import {Transform} from 'class-transformer';

export class CreateCoachQuestionnaireDTO implements CreateCoachQuestionnaire {
  @ApiProperty({
    description: FITNESS_LEVEL_PROPERTY.DESCRIPTION,
    example: FITNESS_LEVEL_PROPERTY.EXAMPLE,
    enum: FITNESS_LEVEL_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  public fitnessLevel!: FitnessLevel;

  @ApiProperty({
    description: EXERCISE_PROPERTY.DESCRIPTION,
    example: EXERCISE_PROPERTY.EXAMPLE,
    enum: EXERCISE_PROPERTY.ENUM,
    maxItems: EXERCISE_PROPERTY.MAX_ITEMS,
    isArray: true
  })
  @IsArray()
  @ArrayMaxSize(EXERCISE_PROPERTY.MAX_ITEMS)
  @IsNotEmpty()
  public exercises!: Exercise[];

  @ApiProperty({
    description: EXPERIENCE_PROPERTY.DESCRIPTION,
    example: EXPERIENCE_PROPERTY.EXAMPLE,
    minimum: EXPERIENCE_PROPERTY.MIN,
    maximum: EXPERIENCE_PROPERTY.MAX,
    type: String
  })
  @IsString()
  @Length(EXPERIENCE_PROPERTY.MIN, EXPERIENCE_PROPERTY.MAX)
  @IsNotEmpty()
  public experience!: string;

  @ApiProperty({
    description: PERSONAL_TRAINING_PROPERTY.DESCRIPTION,
    example: PERSONAL_TRAINING_PROPERTY.EXAMPLE,
    type: Boolean
  })
  @Transform(({value}) => value === 'true' || value === true)
  @IsBoolean()
  @IsNotEmpty()
  public isPersonal!: boolean;
}
