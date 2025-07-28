import {PrismaClientModule} from '@1770169-fitfriends/models';
import {Module} from '@nestjs/common';
import {FeedbackRepository} from './feedback.repository';
import {FeedbackService} from './feedback.service';
import {FeedbackController} from './feedback.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [FeedbackController],
  providers: [FeedbackRepository, FeedbackService]
})
export class FeedbackModule {}
