import {ApiProperty} from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min
} from 'class-validator';
import {Transform} from 'class-transformer';

import {CreateFeedback} from '@1770169-fitfriends/types';

import {ASSESSMENT_PROPERTY, CONTENT_PROPERTY} from './dto.const';

export class CreateFeedbackDto implements CreateFeedback {
  @ApiProperty({
    description: ASSESSMENT_PROPERTY.DESCRIPTION,
    example: ASSESSMENT_PROPERTY.EXAMPLE,
    minimum: ASSESSMENT_PROPERTY.MIN,
    maximum: ASSESSMENT_PROPERTY.MAX,
    type: ASSESSMENT_PROPERTY.TYPE
  })
  @IsInt()
  @Min(ASSESSMENT_PROPERTY.MIN)
  @Max(ASSESSMENT_PROPERTY.MAX)
  @Transform(({value}) => parseInt(value, 10))
  @IsNotEmpty()
  assessment!: number;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE,
    minimum: CONTENT_PROPERTY.MIN,
    maximum: CONTENT_PROPERTY.MAX,
    type: CONTENT_PROPERTY.TYPE
  })
  @IsString()
  @Length(CONTENT_PROPERTY.MIN, CONTENT_PROPERTY.MAX)
  @IsNotEmpty()
  content!: string;
}
