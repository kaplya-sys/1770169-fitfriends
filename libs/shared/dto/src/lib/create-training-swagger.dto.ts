import {ApiProperty} from '@nestjs/swagger';

import {CreateTrainingDTO} from './create-training.dto';
import {VIDEO_PROPERTY} from './dto.const';

export class CreateTrainingSwaggerDTO extends CreateTrainingDTO {
  @ApiProperty({
    description: VIDEO_PROPERTY.DESCRIPTION,
    example: VIDEO_PROPERTY.EXAMPLE,
    format: VIDEO_PROPERTY.FORMAT,
    type: String,
  })
  public video!: string;
}
