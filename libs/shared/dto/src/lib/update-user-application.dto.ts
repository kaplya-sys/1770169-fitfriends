import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

import {UserApplicationStatus} from '@1770169-fitfriends/models';
import {UpdateUserApplication} from '@1770169-fitfriends/types';

import {APPLICATION_STATUS_PROPERTY} from './dto.const';

export class UpdateUserApplicationDTO implements UpdateUserApplication {
  @ApiProperty({
    description: APPLICATION_STATUS_PROPERTY.DESCRIPTION,
    example: APPLICATION_STATUS_PROPERTY.EXAMPLE,
    enum: APPLICATION_STATUS_PROPERTY.ENUM
  })
  @IsString()
  @IsNotEmpty()
  public status!: UserApplicationStatus;
}
