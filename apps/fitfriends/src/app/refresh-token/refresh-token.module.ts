import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-guitar/models';

import {RefreshTokenService} from './refresh-token.service';
import {RefreshTokenRepository} from './refresh-token.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [RefreshTokenRepository, RefreshTokenService],
  exports: [RefreshTokenService]
})
export class RefreshTokenModule {}
