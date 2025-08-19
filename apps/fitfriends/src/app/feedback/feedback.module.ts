import {PrismaClientModule} from '@1770169-fitfriends/models';
import {Module} from '@nestjs/common';
import {FeedbackRepository} from './feedback.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [FeedbackRepository],
  exports: [FeedbackRepository]
})
export class FeedbackModule {}
