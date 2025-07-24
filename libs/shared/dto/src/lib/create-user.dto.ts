import {ApiProperty} from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

import {CreateUser} from '@1770169-guitar/types';
import {Role} from '@1770169-guitar/models';

import {EMAIL_PROPERTY, NAME_PROPERTY, PASSWORD_PROPERTY, ROLE_PROPERTY} from './dto.const';

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
  @IsEnum(Role)
  @IsOptional()
  public role?: Role;
}
