import {Module} from '@nestjs/common';

import {PrismaClientModule} from '@1770169-fitfriends/models';

import {MetroStationRepository} from './metro-station.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [MetroStationRepository],
  exports: [MetroStationRepository]
})
export class MetroStationModule {}
