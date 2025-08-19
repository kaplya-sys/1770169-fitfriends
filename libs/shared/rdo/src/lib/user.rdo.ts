import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';

import {Gender, Location, Role} from '@1770169-fitfriends/models';

import {
  AVATAR_PROPERTY,
  BACKGROUND_PROPERTY,
  BIRTHDAY_PROPERTY,
  DATE_PROPERTY,
  DESCRIPTION_PROPERTY,
  EMAIL_PROPERTY,
  GENDER_PROPERTY,
  ID_PROPERTY,
  LOCATION_PROPERTY,
  NAME_PROPERTY,
  QUESTIONNAIRE_PROPERTY,
  READY_PROPERTY,
  ROLE_PROPERTY
} from './rdo.constant';
import {ImageRDO} from './image.rdo';
import {QuestionnaireRdo} from './questionnaire.rdo';

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
    description: AVATAR_PROPERTY.DESCRIPTION,
    type: ImageRDO
  })
  @Type(() => ImageRDO)
  @Expose()
  public avatar?: ImageRDO;

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
  public gender!: Gender;

  @ApiProperty({
    description: LOCATION_PROPERTY.DESCRIPTION,
    example: LOCATION_PROPERTY.EXAMPLE
  })
  @Expose()
  public location!: Location;

  @ApiProperty({
    description: BACKGROUND_PROPERTY.DESCRIPTION,
    type: ImageRDO,
    isArray: true
  })
  @Type(() => ImageRDO)
  @Expose()
  public backgrounds!: ImageRDO[];

  @ApiProperty({
    description: READY_PROPERTY.DESCRIPTION,
    example: READY_PROPERTY.EXAMPLE
  })
  @Expose()
  public isReady!: boolean;

  @ApiProperty({
    description: DATE_PROPERTY.DESCRIPTION,
    example: DATE_PROPERTY.EXAMPLE
  })
  @Expose()
  public createdAt!: Date;

  @ApiProperty({
    description: BIRTHDAY_PROPERTY.DESCRIPTION,
    example: BIRTHDAY_PROPERTY.EXAMPLE
  })
  @Expose()
  public birthday?: Date;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: QUESTIONNAIRE_PROPERTY.DESCRIPTION,
    type: QuestionnaireRdo
  })
  @Type(() => QuestionnaireRdo)
  @Expose()
  public questionnaire?: QuestionnaireRdo;
}
