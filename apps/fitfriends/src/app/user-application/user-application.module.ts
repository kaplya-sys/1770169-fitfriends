import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-fitfriends/models';

import {AuthModule} from '../auth/auth.module';
import {NotificationModule} from './../notification/notification.module';
import {UserApplicationRepository} from './user-application.repository';
import {UserApplicationService} from './user-application.service';
import {UserApplicationController} from './user-application.controller';

@Module({
  imports: [AuthModule, NotificationModule, PrismaClientModule],
  providers: [UserApplicationService, UserApplicationRepository],
  controllers: [UserApplicationController]
})
export class UserApplicationModule {}
