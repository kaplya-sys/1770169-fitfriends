import {ApiProperty} from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

import {
  Exercise,
  FitnessLevel,
  Gender,
  Location,
  UpdateUser
} from '@1770169-fitfriends/types';

import {
  DESCRIPTION_PROPERTY,
  EXERCISE_PROPERTY,
  FITNESS_LEVEL_PROPERTY,
  GENDER_PROPERTY,
  LOCATION_PROPERTY,
  NAME_PROPERTY,
  READY_PROPERTY
} from './dto.const';

export class UpdateUserDTO implements UpdateUser {
  @ApiProperty({
    description: NAME_PROPERTY.DESCRIPTION,
    example: NAME_PROPERTY.EXAMPLE,
    minimum: NAME_PROPERTY.MIN,
    maximum: NAME_PROPERTY.MAX,
    type: NAME_PROPERTY.TYPE
  })
  @IsString()
  @Length(NAME_PROPERTY.MIN, NAME_PROPERTY.MAX)
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: GENDER_PROPERTY.DESCRIPTION,
    example: GENDER_PROPERTY.EXAMPLE,
    enum: GENDER_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  gender?: Gender;

  @ApiProperty({
    description: LOCATION_PROPERTY.DESCRIPTION,
    example: LOCATION_PROPERTY.EXAMPLE,
    enum: LOCATION_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  location?: Location;

  @ApiProperty({
    description: EXERCISE_PROPERTY.DESCRIPTION,
    example: EXERCISE_PROPERTY.EXAMPLE,
    enum: EXERCISE_PROPERTY.ENUM,
    type: [EXERCISE_PROPERTY.TYPE],
    maxItems: EXERCISE_PROPERTY.MAX_ITEMS
  })
  @IsArray()
  @ArrayMaxSize(EXERCISE_PROPERTY.MAX_ITEMS)
  exercise?: Exercise[];

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE,
    minimum: DESCRIPTION_PROPERTY.MIN,
    maximum: DESCRIPTION_PROPERTY.MAX,
    type: DESCRIPTION_PROPERTY.TYPE
  })
  @IsString()
  @Length(DESCRIPTION_PROPERTY.MIN, DESCRIPTION_PROPERTY.MAX)
  description?: string;

  @ApiProperty({
    description: READY_PROPERTY.DESCRIPTION,
    example: READY_PROPERTY.EXAMPLE,
    type: READY_PROPERTY.TYPE
  })
  @IsBoolean()
  @IsNotEmpty()
  isReady?: boolean;

  @ApiProperty({
    description: FITNESS_LEVEL_PROPERTY.DESCRIPTION,
    example: FITNESS_LEVEL_PROPERTY.EXAMPLE,
    enum: FITNESS_LEVEL_PROPERTY.ENUM
  })
  @IsString()
  fitnessLevel?: FitnessLevel
}
