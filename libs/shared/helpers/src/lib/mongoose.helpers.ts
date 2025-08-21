import * as Joi from 'joi';
import {ConfigService} from '@nestjs/config';
import {MongooseModuleAsyncOptions} from '@nestjs/mongoose';

import {MongooseConfig} from '@1770169-fitfriends/types';

import {createMessage} from './common.helpers';
import {MONGO_VALIDATE_ERROR_MESSAGE} from './helpers.constant';

const mongooseSchema = Joi.object({
  name: Joi.string().required(),
  host: Joi.string().hostname().required(),
  username: Joi.string().required(),
  userPassword: Joi.string().required(),
  port: Joi.number().port().required(),
  authSource: Joi.string().required()
});

function validateConfig(config: MongooseConfig): void {
  const {error} = mongooseSchema.validate(config, {abortEarly: true});

  if(error) {
    throw new Error(createMessage(MONGO_VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

export function getMongoConnectionString({host, port, name, username, userPassword, authSource}: MongooseConfig): string {
  return `mongodb://${username}:${userPassword}@${host}:${port}/${name}?authSource=${authSource}`;
};

export function getMongooseConfig(): MongooseConfig {
  const config: MongooseConfig = {
    name: process.env.MONGO_INITDB_NAME || '',
    host: process.env.MONGO_INITDB_HOST || '',
    username: process.env.MONGO_INITDB_ROOT_USERNAME || '',
    userPassword: process.env.MONGO_INITDB_ROOT_PASSWORD || '',
    port: parseInt(process.env.MONGO_INITDB_PORT || '', 10),
    authSource: process.env.MONGO_AUTH_SOURCE || ''
  };
  validateConfig(config);

  return config;
}

export function getMongooseOptions(optionSpace: string): MongooseModuleAsyncOptions {
  return {
    useFactory: async(config: ConfigService) => ({
      uri: getMongoConnectionString({
        host: config.get<string>(`${optionSpace}.host`) || '',
        port: parseInt(config.get<string>(`${optionSpace}.port`) || '', 10),
        name: config.get<string>(`${optionSpace}.name`) || '',
        username: config.get<string>(`${optionSpace}.username`) || '',
        userPassword: config.get<string>(`${optionSpace}.userPassword`) || '',
        authSource: config.get<string>(`${optionSpace}.authSource`) || ''
      })
    }),
    inject: [ConfigService]
  };
}
