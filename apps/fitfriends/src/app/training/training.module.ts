import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-fitfriends/models';

import {TrainingController} from './training.controller';
import {TrainingService} from './training.service';
import {TrainingRepository} from './training.repository';
import {FilesModule} from '../files/files.module';
import {FilesService} from '../files/files.service';
import {FeedbackModule} from '../feedback/feedback.module';
import {AuthModule} from '../auth/auth.module';
import {OrdersModule} from '../orders/orders.module';


@Module({
  imports: [
    PrismaClientModule,
    FilesModule,
    FeedbackModule,
    AuthModule,
    OrdersModule
  ],
  controllers: [TrainingController],
  providers: [
    TrainingService,
    TrainingRepository,
    FilesService
  ]
})
export class TrainingModule {}
