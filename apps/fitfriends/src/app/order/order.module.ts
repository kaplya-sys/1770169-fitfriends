import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-fitfriends/models';

import {OrderRepository} from './order.repository';
import {OrderController} from './order.controller';
import {AuthModule} from '../auth/auth.module';
import {TrainingModule} from '../training/training.module';
import {OrderService} from './order.service';
import {FilesModule} from '../files/files.module';

@Module({
  imports: [
    AuthModule,
    FilesModule,
    PrismaClientModule,
    TrainingModule
  ],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService]
})
export class OrderModule {}
