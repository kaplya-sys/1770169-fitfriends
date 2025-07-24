import {registerAs} from '@nestjs/config';

import {createMessage} from '@1770169-fitfriends/helpers';
import {JWTConfig} from '@1770169-fitfriends/types';

import {jwtValidationSchema} from './jwt-validation.schema';
import {VALIDATE_JWT_ERROR_MESSAGE} from '../config.constant';

function validateJwtConfig(config: JWTConfig): void {
  const {error} = jwtValidationSchema.validate(config, {abortEarly: true});
  if (error) {
    throw new Error(createMessage(VALIDATE_JWT_ERROR_MESSAGE, [error.message]));
  }
}

function getJwtConfig(): JWTConfig {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || '',
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN  || '',
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || ''
  };

  validateJwtConfig(config);
  return config;
}

export const JwtConfig = registerAs('jwtConfig', getJwtConfig);
