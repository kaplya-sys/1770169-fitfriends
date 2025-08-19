import {Module} from "@nestjs/common";

import {PrismaClientModule} from "@1770169-fitfriends/models";

import {BalanceRepository} from "./balance.repository";

@Module({
  imports: [PrismaClientModule],
  providers: [BalanceRepository],
  exports: [BalanceRepository]
})
export class BalanceModule {}
