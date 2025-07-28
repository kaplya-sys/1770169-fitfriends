import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

import {FeedbackService} from './feedback.service';

@ApiTags('')
@Controller('')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService
  ) {}
}
