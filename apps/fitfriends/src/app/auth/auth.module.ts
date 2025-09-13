import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import {getJwtOptions} from '@1770169-fitfriends/config';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from '../user/user.module';
import {JWTAccessStrategy} from '../strategies/jwt-access.strategy';
import {LocalStrategy} from '../strategies/local.strategy';
import {JWTRefreshStrategy} from '../strategies/jwt-refresh.strategy';
import {RefreshTokenModule} from '../refresh-token/refresh-token.module';
import {FilesModule} from '../files/files.module';
import {QuestionnaireModule} from '../questionnaire/questionnaire.module';
import {BalanceModule} from '../balance/balance.module';
import {FriendModule} from '../friend/friend.module';


@Module({
  imports: [
    BalanceModule,
    UserModule,
    FilesModule,
    FriendModule,
    QuestionnaireModule,
    RefreshTokenModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTAccessStrategy,
    JWTRefreshStrategy,
    LocalStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
