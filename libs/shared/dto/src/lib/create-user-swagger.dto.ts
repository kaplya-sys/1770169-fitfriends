import {ApiProperty} from '@nestjs/swagger';

import {CreateUserDTO} from './create-user.dto';
import {AVATAR_PROPERTY} from './dto.const';

export class CreateUserSwaggerDTO extends CreateUserDTO {
  @ApiProperty({
    description: AVATAR_PROPERTY.DESCRIPTION,
    example: AVATAR_PROPERTY.EXAMPLE,
    format: AVATAR_PROPERTY.FORMAT,
    type: String,
  })
  public avatar?: string;
}
