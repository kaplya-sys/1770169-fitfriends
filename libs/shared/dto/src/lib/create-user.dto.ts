import {ApiProperty} from '@nestjs/swagger';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import {Transform} from 'class-transformer';

import {CreateUser} from '@1770169-fitfriends/types';
import {Gender, Location, Role} from '@1770169-fitfriends/models';

import {
  BIRTHDAY_PROPERTY,
  EMAIL_PROPERTY,
  GENDER_PROPERTY,
  LOCATION_PROPERTY,
  NAME_PROPERTY,
  PASSWORD_PROPERTY,
  ROLE_PROPERTY
} from './dto.const';

export class CreateUserDTO implements CreateUser {
  @ApiProperty({
    description: NAME_PROPERTY.DESCRIPTION,
    example: NAME_PROPERTY.EXAMPLE,
    minimum: NAME_PROPERTY.MIN,
    maximum: NAME_PROPERTY.MAX,
    type: NAME_PROPERTY.TYPE
  })
  @IsString()
  @Length(NAME_PROPERTY.MIN, NAME_PROPERTY.MAX)
  @IsNotEmpty()
  public name!: string;

  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE,
    type: EMAIL_PROPERTY.TYPE
  })
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty({
    description: PASSWORD_PROPERTY.DESCRIPTION,
    example: PASSWORD_PROPERTY.EXAMPLE,
    minimum: PASSWORD_PROPERTY.MIN,
    maximum: PASSWORD_PROPERTY.MAX,
    type: PASSWORD_PROPERTY.TYPE
  })
  @IsString()
  @Length(PASSWORD_PROPERTY.MIN, PASSWORD_PROPERTY.MAX)
  @IsNotEmpty()
  public password!: string;

  @ApiProperty({
    description: ROLE_PROPERTY.DESCRIPTION,
    example: ROLE_PROPERTY.EXAMPLE,
    enum: ROLE_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  public role!: Role;

  @ApiProperty({
    description: GENDER_PROPERTY.DESCRIPTION,
    example: GENDER_PROPERTY.EXAMPLE,
    enum: GENDER_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  gender!: Gender;

  @ApiProperty({
    description: LOCATION_PROPERTY.DESCRIPTION,
    example: LOCATION_PROPERTY.EXAMPLE,
    enum: LOCATION_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  location!: Location;

  @ApiProperty({
    description: BIRTHDAY_PROPERTY.DESCRIPTION,
    example: BIRTHDAY_PROPERTY.EXAMPLE,
    format: BIRTHDAY_PROPERTY.FORMAT,
    type: BIRTHDAY_PROPERTY.TYPE
  })
  @IsISO8601({strict: true})
  @Transform(({value}) => new Date(value))
  @IsOptional()
  birthday?: Date;
}
