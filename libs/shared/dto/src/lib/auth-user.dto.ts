import {ApiProperty} from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length
} from 'class-validator';

import {AuthUser} from '@1770169-fitfriends/types';

import {EMAIL_PROPERTY, PASSWORD_PROPERTY} from './dto.const';

export class AuthUserDTO implements AuthUser {
  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE,
    type: String
  })
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @ApiProperty({
    description: PASSWORD_PROPERTY.DESCRIPTION,
    example: PASSWORD_PROPERTY.EXAMPLE,
    minimum: PASSWORD_PROPERTY.MIN,
    maximum: PASSWORD_PROPERTY.MAX,
    type: String
  })
  @IsString()
  @Length(PASSWORD_PROPERTY.MIN, PASSWORD_PROPERTY.MAX)
  @IsNotEmpty()
  public password!: string;
}
