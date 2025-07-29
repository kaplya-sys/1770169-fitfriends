import {ApiProperty} from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

import {Exercise, FitnessLevel, Gender, Location} from '@1770169-fitfriends/models';
import {UpdateUser} from '@1770169-fitfriends/types';

import {
  EXERCISE_PROPERTY,
  FITNESS_LEVEL_PROPERTY,
  GENDER_PROPERTY,
  LOCATION_PROPERTY,
  NAME_PROPERTY,
  READY_PROPERTY,
  USER_DESCRIPTION
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
  @IsOptional()
  gender?: Gender;

  @ApiProperty({
    description: LOCATION_PROPERTY.DESCRIPTION,
    example: LOCATION_PROPERTY.EXAMPLE,
    enum: LOCATION_PROPERTY.ENUM
  })
  @IsString()
  @IsOptional()
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
  @IsOptional()
  exercise?: Exercise[];

  @ApiProperty({
    description: USER_DESCRIPTION.DESCRIPTION,
    example: USER_DESCRIPTION.EXAMPLE,
    minimum: USER_DESCRIPTION.MIN,
    maximum: USER_DESCRIPTION.MAX,
    type: USER_DESCRIPTION.TYPE
  })
  @IsString()
  @Length(USER_DESCRIPTION.MIN, USER_DESCRIPTION.MAX)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: READY_PROPERTY.DESCRIPTION,
    example: READY_PROPERTY.EXAMPLE,
    type: READY_PROPERTY.TYPE
  })
  @IsBoolean()
  @IsOptional()
  isReady?: boolean;

  @ApiProperty({
    description: FITNESS_LEVEL_PROPERTY.DESCRIPTION,
    example: FITNESS_LEVEL_PROPERTY.EXAMPLE,
    enum: FITNESS_LEVEL_PROPERTY.ENUM
  })
  @IsString()
  @IsOptional()
  fitnessLevel?: FitnessLevel
}
