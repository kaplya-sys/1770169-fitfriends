import {ConfigService} from '@nestjs/config';
import {JwtModuleOptions} from '@nestjs/jwt';

import {ALGORITHM} from '../config.constant';

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwtConfig.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwtConfig.accessTokenExpiresIn'),
      algorithm: ALGORITHM,
    }
  }
}
