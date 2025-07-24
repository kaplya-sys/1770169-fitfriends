import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import {getJwtOptions} from '@1770169-guitar/config';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from '../user/user.module';
import {JWTAccessStrategy} from './strategies/jwt-access.strategy';
import {LocalStrategy} from './strategies/local.strategy';
import {JWTRefreshStrategy} from './strategies/jwt-refresh.strategy';
import {RefreshTokenModule} from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    UserModule,
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
})
export class AuthModule {}
