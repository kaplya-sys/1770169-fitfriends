import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-fitfriends/models';

import {NotificationController} from './notification.controller';
import {NotificationService} from './notification.service';
import {NotificationRepository} from './notification.repository';

@Module({
  imports: [PrismaClientModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService]
})
export class NotificationModule {}
