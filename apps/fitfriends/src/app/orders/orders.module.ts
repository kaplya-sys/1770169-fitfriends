import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-fitfriends/models';

import {OrdersRepository} from './orders.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [OrdersRepository],
  exports: [OrdersRepository]
})
export class OrdersModule {}
