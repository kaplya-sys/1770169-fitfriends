import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

import {UserApplicationStatus} from '@1770169-fitfriends/models';
import {CreateUserApplication} from '@1770169-fitfriends/types';

import {APPLICATION_STATUS_PROPERTY, USER_ID_PROPERTY} from './dto.const';

export class CreateUserApplicationDTO implements CreateUserApplication {
  @ApiProperty({
    description: USER_ID_PROPERTY.DESCRIPTION,
    example: USER_ID_PROPERTY.EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  public userId!: string;

  @ApiProperty({
    description: APPLICATION_STATUS_PROPERTY.DESCRIPTION,
    example: APPLICATION_STATUS_PROPERTY.EXAMPLE,
    enum: APPLICATION_STATUS_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  public status!: UserApplicationStatus;
}
