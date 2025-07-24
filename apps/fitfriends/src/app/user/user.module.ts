import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-guitar/models';

import {UserRepository} from './user.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
