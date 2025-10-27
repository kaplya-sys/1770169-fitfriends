import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MailModule} from '../mail/mail.module';
import {SubscriberModel, SubscriberSchema} from './subscriber.model';
import {SubscriberRepository} from './subscriber.repository';
import {SubscriberService} from './subscriber.service';
import {SubscriberController} from './subscriber.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubscriberModel.name,
        schema: SubscriberSchema
      }
    ]),
    MailModule
  ],
  controllers: [SubscriberController],
  providers: [
    SubscriberRepository,
    SubscriberService
  ],
  exports: [SubscriberService],
})
export class SubscriberModule {}
