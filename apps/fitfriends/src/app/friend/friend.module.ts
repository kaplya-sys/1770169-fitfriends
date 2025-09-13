import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-fitfriends/models';

import {FriendRepository} from './friend.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [FriendRepository],
  exports: [FriendRepository]
})
export class FriendModule {}
