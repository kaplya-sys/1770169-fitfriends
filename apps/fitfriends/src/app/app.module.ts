import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {ConfigAppModule} from '@1770169-fitfriends/config';
import {getMongooseOptions} from '@1770169-fitfriends/helpers';

import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {FilesModule} from './files/files.module';
import {TrainingModule} from './training/training.module';
import {OrderModule} from './order/order.module';
import {RefreshTokenModule} from './refresh-token/refresh-token.module';
import {QuestionnaireModule} from './questionnaire/questionnaire.module';
import {FriendModule} from './friend/friend.module';
import {FeedbackModule} from './feedback/feedback.module';
import {BalanceModule} from './balance/balance.module';
import {SubscriberModule} from './subscriber/subscriber.module';
import {MailModule} from './mail/mail.module';
import {NotificationModule} from './notification/notification.module';
import {UserApplicationModule} from './user-application/user-application.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    FilesModule,
    TrainingModule,
    OrderModule,
    ConfigAppModule,
    RefreshTokenModule,
    QuestionnaireModule,
    FriendModule,
    FeedbackModule,
    BalanceModule,
    SubscriberModule,
    MailModule,
    NotificationModule,
    UserApplicationModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongoConfig'))
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
