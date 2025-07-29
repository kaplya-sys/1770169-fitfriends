import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import {
  Exercise,
  FitnessLevel,
  Gender,
  Location,
  Role,
  TrainingTime
} from '@1770169-fitfriends/models';

import {
  AVATAR_PROPERTY,
  BACKGROUND_PROPERTY,
  BIRTHDAY_PROPERTY,
  CALORIES_LOSE_PROPERTY,
  CALORIES_WASTE_PROPERTY,
  DATE_PROPERTY,
  DESCRIPTION_PROPERTY,
  EMAIL_PROPERTY,
  EXERCISE_PROPERTY,
  FITNESS_LEVEL_PROPERTY,
  GENDER_PROPERTY,
  ID_PROPERTY,
  LOCATION_PROPERTY,
  NAME_PROPERTY,
  PERSONAL_TRAINING_PROPERTY,
  QUALIFICATIONS_PROPERTY,
  READY_PROPERTY,
  ROLE_PROPERTY,
  TRAINING_TIME_PROPERTY
} from './rdo.constant';
import {ImageRDO} from './image.rdo';

export class UserRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: AVATAR_PROPERTY.DESCRIPTION
  })
  @Type(() => ImageRDO)
  @Expose()
  public avatar!: ImageRDO;

  @ApiProperty({
    description: NAME_PROPERTY.DESCRIPTION,
    example: NAME_PROPERTY.EXAMPLE
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: ROLE_PROPERTY.DESCRIPTION,
    example: ROLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public role!: Role;

  @ApiProperty({
    description: GENDER_PROPERTY.DESCRIPTION,
    example: GENDER_PROPERTY.EXAMPLE
  })
  @Expose()
  gender!: Gender;

  @ApiProperty({
    description: LOCATION_PROPERTY.DESCRIPTION,
    example: LOCATION_PROPERTY.EXAMPLE
  })
  @Expose()
  location!: Location;

  @ApiProperty({
    description: BACKGROUND_PROPERTY.DESCRIPTION
  })
  @Type(() => ImageRDO)
  @Expose()
  background!: ImageRDO;

  @ApiProperty({
    description: READY_PROPERTY.DESCRIPTION,
    example: READY_PROPERTY.EXAMPLE
  })
  @Expose()
  isReady!: boolean;

  @ApiProperty({
    description: DATE_PROPERTY.DESCRIPTION,
    example: DATE_PROPERTY.EXAMPLE
  })
  @Expose()
  createdAt!: Date;

  @ApiProperty({
    description: EXERCISE_PROPERTY.DESCRIPTION,
    example: EXERCISE_PROPERTY.EXAMPLE
  })
  @Expose()
  exercise!: Exercise[];

  @ApiProperty({
    description: FITNESS_LEVEL_PROPERTY.DESCRIPTION,
    example: FITNESS_LEVEL_PROPERTY.EXAMPLE
  })
  @Expose()
  fitnessLevel!: FitnessLevel;

  @ApiProperty({
    description: CALORIES_LOSE_PROPERTY.DESCRIPTION,
    example: CALORIES_LOSE_PROPERTY.EXAMPLE
  })
  @Expose()
  caloriesLose!: number;

  @ApiProperty({
    description: CALORIES_WASTE_PROPERTY.DESCRIPTION,
    example: CALORIES_WASTE_PROPERTY.EXAMPLE
  })
  @Expose()
  caloriesWaste!: number;

  @ApiProperty({
    description: QUALIFICATIONS_PROPERTY.DESCRIPTION
  })
  @Type(() => ImageRDO)
  @Expose()
  qualifications!: ImageRDO[];

  @ApiProperty({
    description: PERSONAL_TRAINING_PROPERTY.DESCRIPTION,
    example: PERSONAL_TRAINING_PROPERTY.EXAMPLE
  })
  @Expose()
  isPersonal!: boolean;

  @ApiProperty({
    description: BIRTHDAY_PROPERTY.DESCRIPTION,
    example: BIRTHDAY_PROPERTY.EXAMPLE
  })
  @Expose()
  birthday?: Date;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: TRAINING_TIME_PROPERTY.DESCRIPTION,
    example: TRAINING_TIME_PROPERTY.EXAMPLE
  })
  @Expose()
  trainingTime?: TrainingTime;
}
