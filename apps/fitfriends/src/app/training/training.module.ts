import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-fitfriends/models';

import {TrainingController} from './training.controller';
import {TrainingService} from './training.service';
import {TrainingRepository} from './training.repository';
import {FilesModule} from '../files/files.module';
import {FeedbackModule} from '../feedback/feedback.module';
import {AuthModule} from '../auth/auth.module';
import {MailModule} from '../mail/mail.module';
import {SubscriberModule} from '../subscriber/subscriber.module';

@Module({
  imports: [
    PrismaClientModule,
    FilesModule,
    FeedbackModule,
    AuthModule,
    MailModule,
    SubscriberModule
  ],
  controllers: [TrainingController],
  exports: [TrainingService],
  providers: [TrainingService, TrainingRepository]
})
export class TrainingModule {}
